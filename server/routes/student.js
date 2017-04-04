var express = require('express');
var router = express.Router();
var db = require('../database/database');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');



router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

//jwt T
router.use(function(req,res,next){
  var token = req.headers['auth-token'];
  jwt.verify(token, process.env.SECRET, function(err, decoded){
    if(err){
      res.status(400).send("The token is invalid. " + err)
    }else{
      console.log("This is the user's ID: "+ decoded.id);
      req.user_id = decoded.id;
      next();
    }
  })
});

//GET ENDPOINTS
router.get('/get_students',function(req,res,next){
    var query = '';
    db.query(query).spread(function(result, metadata){
        res.json({
           data: result 
        });
    }).catch(function(err){
        res.status(500).send(err);
    })
})

//POST ENDPOINTS


//EXPORTING ROUTER
module.exports = router;