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
//GET all courses Per program
router.get('/get_allCourses',function(req, res, next){
    //validate
    var query = "SELECT * FROM users WHERE id= "+req.user_id;
    db.query(query).spread(function(result, metadata){
        
        return result;
    }).error(function(err){
        res.status(500).send("Unable to process query, ERROR: "+err);
    }).then(function(result){
         var query = "SELECT pc.id, co.course_code, pc.to_be_assessed FROM programs pr INNER JOIN program_course pc ON (pr.id = pc.program_id) INNER JOIN courses co ON (pc.course_id = co.id) WHERE pr.id = " + result[0].program_id;
        db.query(query).spread(function(result, metadata){
            res.json({data:result})
        }).catch(function(err){
            res.status(500).send("Unable to process query, ERROR: "+err);
            
        })
    })
    
})

//GET program_course
router.post('/get_course',function(req,res,next){
     //validate
    var query = "SELECT * FROM users WHERE id = "+req.user_id;
    db.query(query).spread(function(result, metadata){
        return result;
    }).error(function(err){
        res.status(500).send("Unable to process query, ERROR: "+err);
    }).then(function(result){
        var query = "SELECT pc.id, co.course_code, pc.to_be_assessed FROM programs pr INNER JOIN program_course pc ON (pr.id = pc.program_id) INNER JOIN courses co ON (pc.course_id = co.id) WHERE pc.id= "+req.body.programCourseId+" AND pr.id = " + result[0].program_id +" ORDER BY co.course_code ASC";
        db.query(query).spread(function(result, metadata){
            console.log(result);
            res.json({data:result})
        }).catch(function(err){
            res.status(500).send("Unable to process query, ERROR: "+err);
        })
    })
})

//GET TO BE ASSESSED COURSES
router.get('/get_toBeAssessedCourses',function(req,res,next){
    //validate
    var query = "SELECT * FROM users WHERE id = "+req.user_id;
    db.query(query).spread(function(result, metadata){
        return result;
    }).error(function(err){
        res.status(500).send("Unable to process query, ERROR: "+err);
    }).then(function(result){
        var query = "SELECT pc.id, co.course_code, pc.to_be_assessed FROM programs pr INNER JOIN program_course pc ON (pr.id = pc.program_id) INNER JOIN courses co ON (pc.course_id = co.id) WHERE pc.to_be_assessed = true AND pr.id = " + result[0].program_id +" ORDER BY co.course_code ASC";
        db.query(query).spread(function(result, metadata){
            res.json({data:result})
        }).catch(function(err){
            res.status(500).send("Unable to process query, ERROR: "+err);
        })
    })
})
//GET SOPI PER PROGRAM
router.get('/get_programSopi', function(req,res,next){
    //validate
    var query = "SELECT * FROM users WHERE id = "+req.user_id;
    db.query(query).spread(function(result, metadata){
        return result;
    }).error(function(err){
        res.status(500).send("Unable to process query, ERROR: "+err);
    }).then(function(result){
        var query = "SELECT pr.id as program_id, pr.display_name, ps.id as program_sopi_id, sopi.sopi_code, ps.description FROM programs pr INNER JOIN program_sopi ps ON (pr.id = ps.program_id) INNER JOIN sopi sopi ON (ps.sopi_id = sopi.id) WHERE pr.id = "+result[0].program_id;
        db.query(query).spread(function(result, metadata){
            res.json({data:result})
        }).catch(function(err){
            res.status(500).send("Unable to process query, ERROR: "+err);
        })
    })
})


//POST ENDPOINTS
//update to be assessed toggle to true or false
router.post('/updateProgramCourseToBeAssessed',function(req,res,next){
    var query = "SELECT * FROM program_course WHERE id =" + req.body.id;
    db.query(query).spread(function(result, metadata){
        if (result[0].to_be_assessed === true){
            var query = "UPDATE program_course SET to_be_assessed = false WHERE id = "+result[0].id;
            
        }else{
            var query = "UPDATE program_course SET to_be_assessed = true WHERE id = "+result[0].id;
        }
    
        db.query(query).spread(function(result, metadata){
            res.status(200).send("Update Successful" + query);
        }).catch(function(err){
            console.log("ERROR ON post-/updateProgramCourseToBeAssessed No. 2 :"+ err);
        })
    }).catch(function(err){
        console.log("ERROR ON post-/updateProgramCourseToBeAssessed No. 1 :"+ err);
    })    
})
//EXPORT ROUTER

module.exports = router;