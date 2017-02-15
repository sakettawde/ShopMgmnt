var http = require('http');
var mysql = require('mysql');
var nodemailer = require("nodemailer");
var env = process.env.NODE_ENV || 'local';
var environment = {}
console.log( 'env selected is ', env );
if ( env == 'pravin' ){
	environment.connection = mysql.createPool({
		host : 'localhost',
		user : 'root',
		password : 'toor',
		database : 'hospital_global'
	});
	
} else if ( env == 'amol' ){
	environment.connection = mysql.createPool({
		host : 'localhost',
		user : 'root',
		password : 'toor',
		database : 'hospital_global'
	});
	
} else if ( env == 'swapna' ){
	environment.connection = mysql.createPool({
		socketPath : '/tmp/mysql.sock',
		user : 'root',
		password : 'toor',
		database : 'hospital_global'
	});
	

}else if ( env == 'beta' ){
	environment.connection = mysql.createPool({
		host : '146.148.40.15',
		user : 'anup',
		password : 'inevitable',
		database : 'shop_mgmt'
	});
	
} else if ( env == 'prod' ){
	environment.connection = mysql.createPool({
		host : '146.148.40.15',
		user : 'anup',
		password : 'inevitable',
		database : 'shop_mgmt'
	});

} else if ( env == 'rutuja' ){
	environment.connection = mysql.createPool({
		host : '127.0.0.1',
		user : 'root',
		password : '',
		database : ''
	});
	
} else {
	environment.connection = mysql.createPool({
		host : '127.0.0.1',
		user : 'root',
		password : '',
		database : 'shop_mgmt'
	});
	
}

environment.connection.getConnection(function(err, connection) {
  console.log( 'db conection err', err );
});


// environment.transporter= nodemailer.createTransport({
//    	host: 'smtp.gmail.com',
//     port: 465,
//    // service: 'gmail',
//     secure: true, // use SSL
//  	auth:{
//  		user:'initsolutions.services@gmail.com',
//      	pass:'init#123'

//  	}
//  }, {from: '"Brandsout 👥" <noreply@brandsout.com>'} );



module.exports = environment;
