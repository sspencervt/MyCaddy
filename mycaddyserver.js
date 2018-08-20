const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const expressValidator = require('express-validator')
const mongojs = require('mongojs')
const db = mongojs('mongodb://testing:testing1@ds225608.mlab.com:25608/mycaddy')
const courses = db.collection('Courses')
const scorecards = db.collection('Scorecards')
const users = db.collection('Users')
const app = express()
const bcrypt = require('bcryptjs')
const cookieParser = require('cookie-parser')
const stat = require('./public/statistics')

// TO ACCESS DATABASE FROM COMMAND LINE - NEED dbuser and password
// mongo ds225608.mlab.com:25608/mycaddy -u <dbuser> -p <dbpassword>

//  BODY PARSER MIDDLEWARE

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// SET STATIC PATH

app.use(express.static(path.join(__dirname, 'public')))

app.post('/users/add', function (req, res) {

    let newUser = {
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 10)
    }
    users.findOne({"username" : req.body.username}, (err, existingUser) => {
        if(!existingUser){
            users.insert(newUser, function(result) {
                res.cookie("loggedIn","User_Added")
                res.redirect('/')
            })
        } else { 
            res.cookie("loggedIn","User_Exists");
            res.redirect('/');
        }
    })
})

app.post('/users/verify', function(req, res) {
    db.Users.findOne({username:req.body.username}, (err, userObject) => {
        if(userObject){
            if (bcrypt.compareSync(req.body.password, userObject.password)){
                res.cookie("currentUser",userObject.username);
                res.cookie("loggedIn",'true');
                res.redirect('/')
            } else {
                res.cookie("loggedIn","Incorrect_Password")
                res.redirect('/')
            }

        } else {
            res.cookie("loggedIn","Username_Error")
            res.redirect('/')
        }
    })
})

app.post('/statistics/get', function(req,res) {
    db.Scorecards.find({'userName':req.body.userName}, (err,scorecards)=>{
        if(scorecards){
            res.set('Content-Type', 'text/json');
            let roundsPlayed = stat.numberOfRoundsPlayed(scorecards)
            let averageComparedToPar = stat.overallAverageComparedToPar(scorecards)
            let parThreeScoring = stat.parThreeScoringAverage(scorecards);
            let parFourScoring = stat.parFourScoringAverage(scorecards);
            let parFiveScoring = stat.parFiveScoringAverage(scorecards);
            let averageNumberOfPutts = stat.averageNumberOfPutts(scorecards);
            let gir = stat.overallGIR(scorecards);
            let parThreeG = stat.parThreeGIR(scorecards);
            let parFourG = stat.parFourGIR(scorecards);
            let parFiveG = stat.parFiveGIR(scorecards);
            let upDown = stat.upAndDown(scorecards);
            let fairwaysPercentage = stat.overallFairwaysHit(scorecards);
            let missedFairwaysPar = stat.missedFairwaysParConvert(scorecards);
            let hitFairwaysPar = stat.hitFairwaysParConvert(scorecards);
            let statsObject = {
                "roundsPlayed" : roundsPlayed,
                "averageComparedToPar" : averageComparedToPar,
                "parThreeScoring" :  parThreeScoring,
                "parFiveScoring" : parFiveScoring,
                "parFourScoring" : parFourScoring,
                "averageNumberOfPutts" : averageNumberOfPutts,
                "gir" : gir,
                "parThreeG": parThreeG,
                "parFourG" : parFourG,
                "parFiveG" : parFiveG,
                "upDown"  : upDown,
                "fairwaysPercentage" : fairwaysPercentage,
                "missedFairwaysPar" : missedFairwaysPar,
                "hitFairwaysPar" : hitFairwaysPar
            }
            res.send(JSON.stringify(statsObject))
        }  else { console.log('there was no scorecard found with this username') }
    })
});

app.post('/courses/set', function(req, res) {
    let currentCourse = req.body.courseName;
    db.Courses.findOne({courseName:currentCourse}, (err,courseObject)=>{
        res.set('Content-Type', 'text/json');
        res.send(JSON.stringify(courseObject));      
    })
})

app.post('/scorecard/set', function(req,res){
    scorecards.insert(req.body, (err, result) => {
        res.redirect('/')
    })
})
    
const PORT = process.env.PORT

app.get('/', (req, res) => res.send('./login.html'))

app.get('/scorecardPage', (req, res) => res.render('/scorecard.html'))

app.listen(3000, () => console.log('listening on port 3000'))