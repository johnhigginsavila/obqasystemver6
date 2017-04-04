var express = require('express');
var router = express.Router();
var db = require('../database/database');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(7);



router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

//jwt T
router.use(function(req,res,next){
  var token = req.headers['auth-token'];
  jwt.verify(token, process.env.SECRET, function(err, decoded){
    if(err){
      console.log(err);
      res.status(400).send("The token is invalid. " + err)
    }else{
      console.log("This is the user's ID: "+ decoded.id);
      req.user_id = decoded.id;
      next();
    }
  })
});


//GET ENDPOINTS
//GET USER CREDENTIALS
router.get('/get_userCredentials',function(req, res, nesxt){
    var query = "SELECT us.id, us.username, us.email, us.display_name, us.avatar, us.last_name, us.first_name, us.program_id, us.user_restriction FROM users us WHERE us.id="+req.user_id;
    db.query(query).spread(function(result, metadata){
        res.json({
            data:result
        })
    }).catch(function(err){
        res.status(500).send("Unable to process query ERROR: "+err);
    })
})

//GET ALL INSTRUCTORS(access varies depending on restrictions)
router.get('/get_allInstructors', function(req, res, next){
    //validate user access
    var query = "SELECT u.user_restriction, res.display_name FROM users u INNER JOIN restrictions res ON (u.user_restriction = res.id) WHERE u.id="+req.user_id;
    db.query(query).spread(function(result, metadata){
        var restriction = result[0].user_restriction;
        console.log("Restriction : " + result[0].display_name);
        return restriction;        
    }).error(function(err){
        res.status(500).send("Unable to process query ERROR: "+err);
    }).then(function(restriction){
        if(restriction > 4){
            res.status(400).send("You are not allowed to get this content");
            res.end();
        }else if (restriction === 4){
            var query = "SELECT u.user_restriction, res.display_name, u.program_id FROM users u INNER JOIN restrictions res ON (u.user_restriction = res.id) WHERE u.id="+req.user_id;
            db.query(query).spread(function(result, metadata){
                return result;
            }).error(function(err){
                res.status(500).send("Unable to process query ERRORL: "+err)
            }).then(function(result){
                var query = "SELECT us.username, us.email, pr.program_name, res.display_name as position FROM users us INNER JOIN programs pr ON (us.program_id = pr.id) INNER JOIN restrictions res ON (us.user_restriction = res.id)";
                db.query(query).spread(function(result, metadata){
                    console.log(result);
                    res.json({
                        data:result
                    })
                }).catch(function(err){
                    res.status(500).send("Unable to process query ERROR: "+err);
                })
            })
        }else{
            var query = "SELECT us.username, us.email, pr.program_name, res.display_name as position FROM users us INNER JOIN programs pr ON (us.program_id = pr.id) INNER JOIN restrictions res ON (us.user_restriction = res.id)";
            db.query(query).spread(function(result, metadata){
                console.log(result);
                res.json({
                    data:result
                })
            })
        }
    })
})

//GET INSTRUCTORS BY PROGRAM (For coordinator use only)
router.get('/get_instructorsByDepartment', function(req, res, next){
    //validate user
    var query = "SELECT u.user_restriction, res.display_name, u.program_id FROM users u INNER JOIN restrictions res ON (u.user_restriction = res.id) WHERE u.id="+req.user_id;
    db.query(query).spread(function(result, metadata){
        var restriction = result[0].user_restriction;
        console.log("Restriction : " + result[0].display_name);
        return result;        
    }).error(function(err){
        res.status(500).send("Unable to process query ERROR: "+err);
    }).then(function(result){
        if(result[0].user_restriction != 4){
            res.status(400).send("You are not allowed to get this content");
            res.end();
        }else{
            var query = "SELECT username, email, program_id FROM users WHERE program_id ="+result[0].program_id;
            db.query(query).spread(function(result, metadata){
                res.json({
                    data:result
                })
            }).catch(function(err){
                res.status(500).send("Unable to process query ERROR: "+err);
            })
        }
    })
    
})


//POST ENDPOINTS
//Create user ()
router.post('/create_newUser', function(req, res, next){
    //validate user
    var query = "SELECT u.user_restriction, res.display_name, u.program_id FROM users u INNER JOIN restrictions res ON (u.user_restriction = res.id) WHERE u.id="+req.user_id;
    db.query(query).spread(function(result, metadat){
        
        switch(result[0].user_restriction){
            case 1 : 
                return result;
                break;
            case 2 :
                return result;
                break;
            case 3 :
                return result;
                break;
            case 4 :
                return result;
            default:
                res.status(400).send("You are not allowed to create user" )
                res.end();
        }
        
    }).error(function(err){
        res.status(500).send("Unable to process query ERROR: "+err);
    }).then(function(result){
        if(result == undefined){
            res.end();
        }else{
            var password = bcrypt.hashSync(req.body.user_password,salt);
            var query = "INSERT INTO users (username, user_password, email, program_id, user_restriction,  last_name, first_name, date_registered) VALUES ('"+ req.body.username + "', '" + password+ "','" + req.body.email +"', "+req.body.program_id+", "+req.body.userRestriction+", '"+req.body.last_name+"', '"+req.body.first_name+"', now())";
            db.query(query).spread(function(result, metadata){
                res.status(200).send("User was successfully created.");
            }).catch(function(err){
                res.status(500).send("User was not created:"+err);
            })
        }
        
    })
})

//EXPORTING ROUTER
module.exports = router;
