var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var nodemailer = require('nodemailer');
//this is used for generating SVG Captchas
var svgCaptcha = require('svg-captcha');
var async = require('async');
var mysql= require('mysql');
//var User = require('../models/User')



var connection=mysql.createConnection({
	host:"localhost",
	user:"root",
	password:"root",
	database:"concrete"

});



router.get('/', (req, res) => {
	User.getPendingProfilesForVerification((err, profiles) => {
		
          connection.connect(function(err){
    console.log("Connected form getPendingProfilesForVerification");
    connection.query("select * from user where verified='false' && userType='supplier'",function(err,result,fields){
   if(err) throw err;

		console.log(profiles);
		res.render('adminDashboard', {
			profiles: profiles
		})
	})
});
});
});

router.get('/verifyuser/:id', function(req, res){
	var id = req.params.id;
	console.log(id);
	//User.findOneById(id, function(err, user){
		
     connection.connect(function(err){
    console.log("Connected form verifyuser");
    /*connection.query("select * from user where userId='"+id+"' ",function(err,result,fields){
  		if(err){
			console.log(err);
			res.status(500);*/
		
		//result[0].verified = true;
		//console.log(user);
		//user.save()
	 	
    connection.query("update user set verified='true' where userId='"+id+"'",function(err,result,fields){
   //if(err) throw err;
 console.log("Connected form verifyuser");
    res.status(200);
    //res.json(result);
	})
})

});

module.exports = router;