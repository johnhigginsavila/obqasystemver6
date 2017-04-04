var express = require('express');
var router = express.Router();
var db = require('../database/database');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var multer = require('multer');
var upload = multer({ dest: './client/img/uploads'});



router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

//jwt T


router.use(function(req,res,next){
  var token = req.headers['auth-token'];
  jwt.verify(token, process.env.SECRET, function(err, decoded){
    if(err){
        console.log(decoded)
      res.status(400).send("The token is invalid. " + err)
    }else{
      console.log("This is the user's ID: "+ decoded.id);
      req.user_id = decoded.id;
      next();
    }
  })
});


//GET ENDPOINTS

//POST ENDPOINTS
router.post('/upload_pic', upload.single('file'), function(req, res, next){
    res.status(200).send('Upload Successful');
    console.log(req.headers);
    res.end();
})

//EXPORT ROUTER
module.exports = router;