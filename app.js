var express = require('express');
var app = express();
var uc;
var uname;
var path = require('path');
var mongo=require('mongodb');
var mongoClient=mongo.MongoClient;
var url="mongodb://mummy:mummy1@ds059496.mlab.com:59496/blogdatabase";

mongoClient.connect(url,function(err,db){
	console.log("huhyuhyui");
	uc=db.collection('data');
  });

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.post('/login', function ( req, res) {
	var usern = req.param('user');
	var passw = req.param('pass');
	 uc.find({username: usern}).toArray(function(err, docs) {
	      console.log("mn");
	      if(docs.length==0&&usern!=null&&passw!=null){
	      	 uc.insert({username: usern, password:passw}, function(err, result) {
	  	 	res.sendFile(__dirname + '/login.html');
	  	 });
	  	}
	  	 	else if(docs.length!=0){
	  		res.sendFile(__dirname+'/signup.html');
	      	alert("already exist");
	      	 	
	      }
	  	 });
	 var npass=req.param('new');
	 var opass=req.param('confirmpass');
	 if(npass==opass){
	 	uc.update({username:uname},
   {$set:{password:npass}},{multi:true});
	  	res.sendFile(__dirname+'/login.html');
	 }
	  else{
	  	res.sendFile(__dirname+'/reset_pwd.html');
	  }	
	      
})
app.post('/home', function ( req, res) {
	 var usern = req.param('loginname');
	 var passw = req.param('loginpass');
	 uc.find({username: usern,password:passw}).toArray(function(err, docs) {
	      console.log("mn");
	    if(docs.length!=0&&usern!=null&&passw!=null){
	      	 
	  	 	res.sendFile(__dirname + '/home.html');
	  	 
	  	}
	  	 	else{
	  		res.sendFile(__dirname+'/login.html');
	      	console.log("incorrect username or password");
	      	 	
	      }
	  	 });	
	      
})
app.post('/reset_pwd', function ( req, res) {
	uname=req.param('forgotuser');
	uc.find({username: uname}).toArray(function(err, docs) {
		if(docs.length!=0&&uname!=null){
	  	 	res.sendFile(__dirname + '/reset_pwd.html'); 	 
	  	}
	  	 	else{
	  		res.sendFile(__dirname+'/forgot.html');
	      	console.log("incorrect username");
	      	 	
	      }
	  	 });	
	});


app.use(express.static(path.join(__dirname, '/public')));
app.get('/', function (req, res) {
   res.sendFile(__dirname+'/home.html'); 
});
app.get('/login', function (req, res) {
   res.sendFile(__dirname+'/login.html'); 
});
app.get('/signup', function (req, res) {
   res.sendFile(__dirname+'/signup.html'); 

});
app.get('/home', function (req, res) {
   res.sendFile(__dirname+'/home.html'); 

});
app.get('/forgot', function (req, res) {
   res.sendFile(__dirname+'/forgot.html'); 

});
app.get('/reset_pwd', function (req, res) {
   res.sendFile(__dirname+'/reset_pwd.html'); 

});
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
}); 

	

