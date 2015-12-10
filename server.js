
var express = require('express');      //Importing the visible function/modules and creating an object. To export function or module from the main repository (use module.export = "name of function/class"
										//To acquire the function use require and create a variable.
										
var app = express();

					//Calling express function. It must be returning an object which we need to catch in a variable.
var session = require ('express-session');

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'project'
});


app.use(session({secret: 'keyboard cat'}));

var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(express.static(__dirname + '/')); 

var fs = require('fs'); 	//File system of host machine


app.listen(8080, function() {

	console.log("server is listening on 8080 port");
	connection.connect();	

});


//ping test
app.get('/', function(req,res){

	//console.log("ping test");
	
	//req.session.ping = "hi";
	//console.log(req.session.ping);
	res.redirect("/index.html");
//	res.end();

});



/*
app.post('/login', function(req, res){
	console.log(req.body.username);
	res.json({"Result ": req.body.username});
	
});
*/
//FOR USER SIGN IN FIRST END POINT (NOT COMPLETE DATE FUNCTION CHECK )

app.post('/signup', function(req,res){
	
		connection.query('insert into tbl_user(name,email,username,password,date,type) values ("' +req.body.name + '","' +req.body.email + '","' + req.body.username + '","' + req.body.password + '","' + '2011-04-12T00:00:00.000' + '",' + parseInt(req.body.type) + ');', function(err, result){
		
		console.log(err);
		//res.json(result);
		console.log(result);
		//res.json(result);
		
		
	});
	
});

// FOR LOG IN SECOND END POINT 

app.post('/login', function(req,res){
	console.log(req.body.username + "--" + req.body.password);
	var response = {};
	
	connection.query('select * from tbl_user where username = "' + req.body.username + '" and password = "' +req.body.password + '";', function(err,result){
		
		//console.log(result[0].userId);
		if (result.length >0){
			req.session.userId = result[0].userId;
			res.json({"result": "pass"});
			
		}else{
			
			res.json({"result": "fail"});
			
			
		}
		/*
console.log(result);
		response["loginData"] = result;
		res.json(result);
*/
		
		
	});
});

// Another end point to get user data in a session 
app.get('/getuserdata', function(req,res){
	
//var userId = {
//	result : req.session.userId 
//}


//console.log("Check getuserdata userID");
//res.json(userId);

var userId = req.session.userId;

connection.query('select * from tbl_user where userId = "' + userId + '";', function (err, result){
	
	console.log(result);
	res.json(result);
});








})


//SESSION LOG OUT

app.get('/logout', function(req,res){
	
	req.session.userId = null;
	console.log("Success");
	console.log(req.session.userId);
		
	res.end();
		
})



