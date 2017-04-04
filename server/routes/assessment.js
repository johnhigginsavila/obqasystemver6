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
})

//GET ENDPOINTS
router.post('/get_assessmentByProgramCourseIdProgramSopiIdAndAcademicYear', function(req,res,next){
    var query = "SELECT * FROM users WHERE id = "+req.user_id;
    db.query(query).spread(function(result, metadata){
        var data = result;
    }).error(function(err){
        res.status(500).send("Unable to process query this time, ERROR1: "+err);
    }).then(function(){
        var query = "SELECT ass.program_course_id, ass.program_sopi_id, ass.assessment_task, ass.assessment_level FROM assessments ass WHERE ass.program_course_id = "+req.body.programCourseId+"  AND ass.program_sopi_id = "+req.body.programSopiId+" AND ass.academic_year = '"+req.body.academicYear+"'";
        db.query(query).spread(function(result, metadata){
            res.json({
                data : result
            })
        }).catch(function(err){
            res.end();
        })
    })
})

//POST ENDPOINTS

//SET UP CURRICULUM (for coordinators)
//1. validate user
//2. check assessments table for duplicates
//3. insert data into assessments table
//4. insert data into consolidated class table -- can be used for referencing classes in the future
router.post('/post_setUpCurriculum', function(req, res, next){
    //validate user
    var query = "SELECT * FROM users WHERE id = " + req.user_id;
    var data = []
    db.query(query).spread(function(result, metadata){
        if(result[0].user_restriction > 4){
            data = undefined;
        }else{
            data = result;
        }       
        return data;
    }).error(function(err){
        res.status(500).send("Unable to process query this time, ERROR2: "+err);
    }).then(function(data){
        var query = "SELECT pc.id, pc.program_id, co.course_code, pc.description FROM program_course pc INNER JOIN courses co ON (pc.course_id = co.id) WHERE pc.program_id = "+data[0].program_id+" AND co.course_code = '"+req.body.programCourseCode+"'";
        db.query(query).spread(function(result, metadata){
            var assessment = {
                programCourseId : result[0].id,
                programId : result[0].program_id
            }
            return assessment;
        }).error(function(err){
            
        }).then(function(assessment){
            var data = {
                programCourseId : assessment.programCourseId,
                programId : assessment.programId
            }
            var query = "SELECT ps.id, sopi.sopi_code FROM program_sopi ps INNER JOIN sopi sopi ON (ps.sopi_id = sopi.id) WHERE ps.program_id = "+data.programId+" AND sopi.sopi_code = '"+req.body.programSopiCode+"'";
            db.query(query).spread(function(result, metadata){
                var newData = {
                    programId : data.programId,
                    programCourseId : data.programCourseId,
                    programSopiId : result[0].id
                }
                console.log(newData);
                return newData;
            }).error(function(err){
                res.status(500).send("Unable to process query this time, ERROR3: "+err);
            }).then(function(newData){
                var query = "SELECT * FROM assessments WHERE program_sopi_id = "+newData.programSopiId+" AND program_course_id = "+newData.programCourseId+" AND academic_year = '"+req.body.academicYear+"'";
                var data = {
                    programId : newData.programId,
                    programCourseId : newData.programCourseId,
                    programSopiId : newData.programSopiId
                }
                db.query(query).spread(function(result,metadata){
                    var myData = {
                        programId : data.programId,
                        programCourseId : data.programCourseId,
                        programSopiId : data.programSopiId,
                        result : result
                    }
                    return myData;
                }).error(function(err){
                    res.status(500).send("Unable to process query this time, ERROR4: "+err);
                }).then(function(myData){
                    if(myData.result.length > 0){
                        res.status(400).send("The assessment has already been recorded...");
                    }else{
                        var query = "INSERT INTO assessments (program_course_id, program_sopi_id, assessment_level, assessment_task, passing_grade, target, assessment_cycle, date_registered, date_updated, academic_year) VALUES ( "+myData.programCourseId+", "+myData.programSopiId+", "+req.body.assessmentLevel+", '"+req.body.assessmentTask+"', "+req.body.passingGrade+", "+req.body.target+", "+req.body.assessmentCycle+", now(), now(), '"+req.body.academicYear+"')";
                        db.query(query).spread(function(result, metadata){
                            res.status(200).send("Successfully added the assessment!");
                        }).catch(function(err){
                            res.status(500).send("Unable to add assessment at this time");
                        })
                        }
                }).catch(function(err){
                    res.status(500).send("Unable to process query this time, ERROR5: "+err);
                })
            }).catch(function(err){
                res.status(500).send("Unable to process query this time, ERROR6: "+err);
            })
        }).catch(function(err){
            res.status(500).send("Unable to process query this time, ERROR7: "+err);
        })
    }).catch(function(err){
        res.status(500).send("Unable to process query this time, ERROR8: "+err);
    })    
})


//EXPORT ROUTER
module.exports = router;