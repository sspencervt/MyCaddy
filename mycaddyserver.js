const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const expressValidator = require('express-validator')
const mongojs = require('mongojs')
const db = mongojs('mongodb://testing:testing1@ds225608.mlab.com:25608/mycaddy')
const courses = db.collection('Courses')
const scorecard = db.collection('Scorecard')
const users = db.collection('Users')
const app = express()
const bcrypt = require('bcryptjs')
const cookieParser = require('cookie-parser')


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

    users.insert(newUser, function(result) {
        res.redirect('/')
    })
})

app.post('/users/verify', function(req, res) {
    db.Users.findOne({username:req.body.username}, (err, userObject) => {
        if(userObject){
            if (bcrypt.compareSync(req.body.password, userObject.password)){
                console.log("setting cookie currentUser to : " + userObject.username)
                res.cookie("currentUser",userObject.username);
                res.cookie("loggedIn",'true');
                res.redirect('/')
            } else {
                res.cookie("loggedIn","1001")
                res.redirect('/')
            }

        } else {
            res.cookie("loggedIn","2002")
            res.redirect('/')
        }
    })
})

app.post('/scorecards/get', function(req,res) {
    console.log('server side inside scorecards get')
    console.log(req.body)
    db.Scorecards.find({'userName':req.body.userName}, (err,scorecards)=>{
        if(scorecards){
            console.log(scorecards);
            res.set('Content-Type', 'text/json');
            res.send(JSON.stringify(scorecards));  
        } else console.log('there was no scorecard found with this username')
    })
});

app.post('/courses/set', function(req, res) {
    let currentCourse = req.body.courseName;
    db.Courses.findOne({courseName:currentCourse}, (err,courseObject)=>{
        res.set('Content-Type', 'text/json');
        res.send(JSON.stringify(courseObject));      
    })
})

app.get('/', (req, res) => res.send('./login.html'))

app.get('/scorecardPage', (req, res) => res.render('/scorecard.html'))

app.listen(3000, () => console.log('listening on port 3000'))