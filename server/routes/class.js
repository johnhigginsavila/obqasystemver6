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

//"SELECT  s.id, s.student_number, s.student_lastname FROM classes classes INNER JOIN class_student cs ON (classes.id = cs.class_id) INNER JOIN students s ON (cs.student_id = s.id) WHERE classes.id = "+1

router.get('/get_myClasses',function(req,res,next){
    var query = "SELECT prog.display_name as Program_name, classes.id as class_id, u.username as instructor, course.course_code as course_code, classes.term as term, classes.academic_year as academic_year FROM programs prog INNER JOIN users u ON (u.program_id = prog.id)INNER JOIN classes classes ON (u.id = classes.instructor_id)INNER JOIN program_course pc ON (pc.id = classes.program_course_id)INNER JOIN courses course ON (course.id = pc.course_id) WHERE classes.instructor_id ="+req.user_id;
    db.query(query).spread(function(result, metadata){
      return result;  
    }).error(function(err){
        res.status(500).send("Unable to get Data at this time, ERROR: "+err);
    }).then(function(result){
        res.json({data:result})
    })
})

router.post('/get_classStudents', function(req,res,next){
    var query = "SELECT cs.class_id as class_id, stu.id as student_id, stu.student_number, stu.student_lastname || ', ' || stu.student_firstname as student_name FROM class_student cs INNER JOIN students stu ON (cs.student_id = stu.id) WHERE cs.class_id = " + req.body.class_id;
    db.query(query).spread(function(result, metadata){
        if(result.length < 1){
            res.status(400).send("This class is not available")
        }else{
            res.json({
                data: result
            })
        }        
    }).catch(function(err){
        res.status(500).send("Unable to get Data at this time, ERROR: "+err);
    })
})


 
router.get('/get_classesByProgram', function(req,res,next){
    var query = "SELECT program_id FROM users WHERE id = " + req.user_id;
    db.query(query).spread(function(result, metadata){
        console.log(result);
       var programId = result[0].program_id;
        return programId;
    }).error(function(err){
        
    }).then(function(programId){
        var query = "SELECT prog.display_name as Program_name, classes.id as class_ID, u.username as instructor, course.course_code, classes.term as term, classes.academic_year as academic_year FROM programs prog INNER JOIN users u ON (u.program_id = prog.id)INNER JOIN classes classes ON (u.id = classes.instructor_id)INNER JOIN program_course pc ON (pc.id = classes.program_course_id)INNER JOIN courses course ON (course.id = pc.course_id) WHERE prog.id ="+programId;
        db.query(query).spread(function(result, metadata){
            res.json({
                data: result
            })
        }).catch(function(err){
            res.status(500).send("Unable to get Data at this time, ERROR: "+err);
        })
    })
})



//POST ENDPOINTS
router.post('/create_class',function(req,res,next){
    
})

//EXPORTING ROUTER
module.exports = router;