var express = require('express');
var router = express.Router();
var environment = require('./dbconnection');
var dbconnection = environment.connection;
const utils = require('./utils');
var json2html = require('node-json2html');

// router.use(function timeLog(req, res, next) {
//   //res.header('Access-Control-Allow-Origin', req.headers.origin);
//   console.log('Time: ', Date.now());
//   // do auth here
//   utils.validatetoken( req, res, req.headers.authorization, function(){
//     next();
//   });
// });

// api calls
router.post('/create_new',function(req,res){
  // this is post call
  
  var shop_id = req.body.shop_id;
  var shop_name = req.body.shop_name;
  var shop_owner = req.body.shop_owner;
  var shop_number = req.body.shop_number;
  var shop_add = req.body.shop_add;
  var shop_tinno = req.body.shop_tinno;
  console.log(req.body);
   
   if (shop_name && shop_owner && shop_number && shop_add && shop_tinno  ){
      var created_by = utils.getTime();
      var query="insert into shop_table values (NULL,'"+shop_name+"','"+shop_owner+"','"+shop_number+"','"+shop_add+"','"+shop_tinno+"','"+created_by+"')";
    console.log(query);
      dbconnection.query(query,function(error,rows,fields){
        if(error){
          utils.responseError( res, error );
        } else {
          utils.responseSuccess( res, "Add new shop details succesfully.");
        }
      });
  } else {
      utils.responseError( res, "please provide all requied data" );
  }

});

router.get('/list',function(req,res){
    var query="select * from shop_table";

    console.log(query);
    dbconnection.query(query,function(error,rows,fields){
      console.log(rows);
     if (error) {
        utils.responseError( res , error );
      } else{
        utils.responseSuccess( res, { message : 'text message.',
                                      records : rows });
      }
    });
});
 

 
router.post('/edit',function(req,res){
  console.log( req.body);
  // this is post call
  var shop_id=req.body.shop_id;
  var shop_name=req.body.shop_name;
   var shop_owner = req.body.shop_owner;
  var shop_number = req.body.shop_number;
  var shop_add = req.body.shop_add;
  var shop_tinno = req.body.shop_tinno;
  console.log(req.body);
    var query="update shop_table set shop_name='"+shop_name+"', shop_owner='"+shop_owner+"', shop_number='"+shop_number+"' , shop_add='"+shop_add+"', shop_tinno='"+shop_tinno+"' where shop_id= "+shop_id ;

    console.log(query);
    dbconnection.query(query,function(error,rows,fields){
      console.log(rows);
     if (error) {
        utils.responseError( res , error );
      } else{
        utils.responseSuccess( res, {message:"Update shop Details Succesfully."});
      }
    });


});



router.post('/shop_info',function(req,res){
  // this is post call
  var shop_id=req.body.shop_id;
  console.log(req.body.shop_id);
    dbconnection.query("select * from shop_table where shop_id="+shop_id, function(error,rows,fields){
      if (error) {
        
       utils.responseError( res);
      } else{
        utils.responseSuccess( res, { message : 'text message.',
                                      records : rows[0] });
       
      }
    });
});


 router.post('/delete',function(req,res){
   console.log( req.body);
  // this is post call
  var shop_id=req.body.shop_id;

  console.log(req.body);



  if ( shop_id ) {
    var query="delete from shop_table  where shop_id= "+shop_id ;
    console.log(query);
    dbconnection.query(query,function(error,rows,fields){
      console.log(rows);
      if (error) {
        utils.responseError( res, error );
      } else{
        utils.responseSuccess( res, {message:"Delete data succesfully."});
      }

    });

  } else{
      utils.responseError( res, "Please provide all requied data" );
    }


});



module.exports = router;
