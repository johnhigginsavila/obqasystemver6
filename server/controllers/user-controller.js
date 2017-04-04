var db = require('../database/database');
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(7);
var jwt = require('jsonwebtoken');


module.exports.createUser = function(req, res){
  var password = bcrypt.hashSync(req.body.user_password,salt);
  var query = "INSERT INTO users (username, user_password, email, program_id, user_restriction, date_registered) VALUES ('"+ req.body.username + "', '" + password+ "','" + req.body.email +"', "+req.body.programId+", "+req.body.userRestriction+", now())";
  db.query(query).spread(function(result, metadata){
    res.status(200).send("User was successfully created.");
  }).catch(function(err){
    res.status(500).send("User was not created:"+err);
  })
}

module.exports.logIn = function(req, res){
  var submittedPassword = req.body.password;
  var query = "SELECT * FROM users WHERE username = '"+ req.body.loginName +"' OR email = '"+ req.body.loginName + "'";
  db.query(query).spread(function(result, metadata){
    if(result.length > 0){
      var userData = result[0];
      var isVerified = bcrypt.compareSync(submittedPassword, userData.user_password);
      var token = jwt.sign(userData, process.env.SECRET,{
        expiresIn: 60*60*24
      })
      if(isVerified){
        //User authenticated.. Give a token
        console.log(result);  
        delete userData.user_password;  
        res.json({
            userData: userData,
            token: token
          })
      }else{
        res.status(400).send("User entered the wrong password");
      }
    }else{
        res.status(400).send(req.body.loginName +" is not registered.")
    }
  }).catch(function(err){
    res.status(500).send("Unable to process the query, "+err);
  })
}
