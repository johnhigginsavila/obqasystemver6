var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db = require('./server/database/database');
var jwt = require('jsonwebtoken');


process.env.SECRET = "MY SECRET KEY";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/client', express.static(__dirname+'/client'));

//Controller
var userController = require('./server/controllers/user-controller');//registration and login

//Routers
var secureUserRouter = require('./server/routes/user');
var securePageRouter = require('./server/routes/page');
var secureStudentRouter = require('./server/routes/student');
var secureClassRouter = require('./server/routes/class');
var secureCurriculumMapRouter = require('./server/routes/curriculumMap');
var secureAssessmentRouter = require('./server/routes/assessment');
var secureUploadRouter = require('./server/routes/upload');

app.use('/secure-api/user/',secureUserRouter);
app.use('/secure-api/page/',securePageRouter);
app.use('/secure-api/student',secureStudentRouter);
app.use('/secure-api/class',secureClassRouter);
app.use('/secure-api/curriculumMap', secureCurriculumMapRouter);
app.use('/secure-api/assessment', secureAssessmentRouter);
app.use('/secure-api/upload', secureUploadRouter);


//Routes
app.get('/',function(req,res){
  res.sendFile(__dirname +'/client/index.html');
});

app.post('/api/user/create',userController.createUser);
app.post('/api/user/login', userController.logIn);


db.sync().then(function(){
    app.listen(3000, function(){
        console.log("Listening to port " + 3000);
    });
});
