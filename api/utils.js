var environment = require('./dbconnection');

var utils = {

  error: function(err, data) {
    var json = {
      error: err,
      message: err,
      msgclass : 'text-danger assertive',
      data: data
    };
    return json;
  },

  responseSuccess: function(res, data, status) {
    res.status( status || 200);
    data.msgclass = data.msgclass || 'text-success';
    data.status_code = data.status_code || 0;
    res.jsonp(data);
  },

  responseError: function( res, err ) {
    res.status( 500 );
    res.jsonp(this.error(err || 'internal-server-error'));
  },

  responseErrorNotFound: function(res, err) {
    res.status(404);
    res.jsonp(this.error(err || 'not-found'));
  },

  responseErrorUnauthorized: function(res, err) {
    res.status(401);
    res.jsonp(this.error(err || 'unauthorized'));
  },

  responseErrorForbidden: function(res, err) {
    res.status(403);
    res.jsonp(this.error(err || 'forbidden'));
  },

  responseErrorBadRequest: function(res, err) {
    res.status(422);
    res.jsonp(this.error(err || 'bad-request'));
  },

  responseErrorConflict: function(res, err) {
    res.status(409);
    res.jsonp(this.error(err || 'conflict'));
  },

  getRandomNumber: function() {
    //return Math.floor((Math.random()*999999)+1);
    return Math.floor(1000 + Math.random() * 9000);
  },

  getTime: function() {
    return new Date().getTime();
  },

  isEmpty: function(val) {
    return (!val || 0 === val.trim().length);
  },

  getNullIfEmpty: function(val) {
    return this.isEmpty(val) ? null : val;
  },

  validatetoken : function( req, res, token, next ){
    console.log( 'token', token  );
    if( token ){
      next();
    } else {
      utils.responseErrorUnauthorized(res);
    }
  },

  sendSms : function( mobileno , message, callback ){
    request.get( 'http://api.em2878.com/api/Single?apiKey=ENKEKHWPLCFP3WD&from=BOOSTM&to=+91'+mobileno+'&message='+message,
     function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(body) // Show the HTML for the Google homepage.
        console.log(body.message);
        callback( true );
      } else {
        console.log('error while sending message to no');
        callback( false );
      }
    })

  },

  checkvalidemail : function( email ){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test( email );
  },
  checkvalidmobile : function( mobile_number ){
    if( mobile_number.toString().length == 10 ) {
      return true;
    } else {
      return false
    }
  },

 isNumeric : function(value) {
    return /^\d+$/.test(value);
  },
  checkvalidemail : function( email ){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test( email );
  },

  checkvalidmobile : function( mobile_number ){
    if( mobile_number.toString().length == 10 ) {
      return true;
    } else {
      return false
    }
  },

  sendPushNote : function( userid, title, message_text ){
    var sender = new gcm.Sender('AIzaSyByKw8jT-aB8ZOoH_rerTQjj_kkJxbHJWk');
    var message = new gcm.Message();
    message.addData('message', message_text);
    message.addData('title', title);
    message.delay_while_idle = 1;
    var registrationIds = [];
    notifications.load({'user_id':userid}, function(err,tokens){
      if(err){
        console.log('Erorr in getting devices');
      } else {
        if( tokens[0] )
          registrationIds.push( tokens[0].device_id );
      }
      sender.send(message, registrationIds, 4, function (err, result) {
        console.log('sender.send id token',result);
      });

    });
  }

};

module.exports = utils;
