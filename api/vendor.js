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




// // api calls
// router.post('/sign_up',function(req,res){
//   // this is post call

//   var user_name=req.body.user_name;
//   var user_pass=req.body.user_pass;
 
//  // var user_dob=req.body.user_dob;
//   var email_address=req.body.email_address;
//  // var email_confirmed=req.body.email_confirmed;
//   var mobile_number=req.body.mobile_number;
//  // var mobile_confirmed=req.body.mobile_confirmed;
//   //var confirm_code=req.body.confirm_code;
  
//   console.log(req.body);

  

   
//   if (user_name && user_pass && email_address && mobile_number ) {
//     var query="insert into admin values (NULL,'"+user_name+"','"+user_pass+"','"+email_address+"','"+mobile_number+"')";
//     console.log(query);
//       dbconnection.query(query,function(error,rows,fields){
//           if(error){
//             console.log(error);
//           utils.responseError( res, error );
//         } else {
//           utils.responseSuccess( res, "Signup succesfully.");
//         }
//       });
//   } else{
//       utils.responseError( res, "please provide all requied data" );
//     }


// });


router.get('/list',function(req,res){
    var query="select * from vendor_table";

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


router.post('/create_new',function(req,res){
  // this is post call
  
  var v_id = req.body.v_id;
  var v_name = req.body.v_name;
  var address = req.body.address;
  var mobile_no = req.body.mobile_no;
  var email_id = req.body.email_id;
  console.log(req.body);
   
   if (v_name && address && mobile_no && email_id){
      var query="insert into vendor_table values (NULL,'"+v_name+"','"+address+"','"+mobile_no+"','"+email_id+"')";
    console.log(query);
      dbconnection.query(query,function(error,rows,fields){
        if(error){
          utils.responseError( res, error );
        } else {
          utils.responseSuccess( res, "Add new vendor succesfully.");
        }
      });
  } else {
      utils.responseError( res, "please provide all requied data" );
  }

});


router.post('/vendor_info',function(req,res){
  // this is post call
  var v_id=req.body.v_id;
  console.log(req.body.v_id);
    dbconnection.query("select * from vendor_table where v_id="+v_id, function(error,rows,fields){
      if (error) {
        
       utils.responseError( res);
      } else{
        utils.responseSuccess( res, { message : 'text message.',
                                      records : rows[0] });
       
      }
    });
});


router.post('/edit',function(req,res){
  console.log( req.body);
  // this is post call
  var v_id=req.body.v_id;
  var v_name=req.body.v_name;
  var address = req.body.address;
  var mobile_no = req.body.mobile_no;
  var email_id = req.body.email_id;
  console.log(req.body);
    var query="update vendor_table set v_name='"+v_name+"', address='"+address+"', mobile_no='"+mobile_no+"',email_id='"+email_id+"' where v_id= "+v_id ;

    console.log(query);
    dbconnection.query(query,function(error,rows,fields){
      console.log(rows);
     if (error) {
        utils.responseError( res , error );
      } else{
        utils.responseSuccess( res, {message:"Update Vendor Details Succesfully."});
      }
    });


});

router.post('/delete',function(req,res){
   console.log( req.body);
  // this is post call
  var v_id=req.body.v_id;

  console.log(req.body);



  if ( v_id ) {
    var query="delete from vendor_table  where v_id= "+v_id ;
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






// router.post('/forget_password',function(req,res){
//   // this is post call
  
// var transform = {'tag':'','html':'${user_pass}'};

  
// var email_address=req.body.email_address;

  

//     dbconnection.query("select user_pass from admin where email_address='"+email_address+"'" , function(error,rows,fields){
//       if (rows.length!=0) {
//         utils.responseSuccess( res, { message : 'text message.',
//                                       records : rows });
//         var string = json2html.transform(rows[0],transform);;

//         var mailOptions={
//           from : "Brandsout <rutuja@init.solutions>",
//           to : email_address,
//           subject : "Brands Out",
//           text : 'Password:'+string
//         }
//         console.log(mailOptions);
//         environment.transporter.sendMail(mailOptions, function(error, response){
//           if(error){
//             console.log(error);
//             res.end("error");
//           }else{
//             console.log("Message sent: " + response.message);
//             res.end("sent");
//           }
//         });

//       } else{
//        utils.responseError( res, "please enter valid email address" );
//       }
//     });
// });



module.exports = router;