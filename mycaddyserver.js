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

/////////////////////////////////////

//////// install cookie parser. then uncomment and see what breaks
//////// you will need to go to another part of the site
//////// because you haven't generated the cookie yet
// var isLoggedIn = function(req, res, next) {
//     console.log(req.cookie + 'this mah cookie')
//     next()
// }

// app.use(isLoggedIn)
////////////

app.post('/users/add', function (req, res) {
    console.log('in /users/add/')
    console.log(req.body)
    let newUser = {
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 10)
    }

    console.log(newUser);
    users.insert(newUser, function(result) {
        res.redirect('/')
    })
})

app.post('/users/verify', function(req, res) {
    console.log('inside /users/verify')
    console.log(req.body)
    let userPassword;
    db.Users.findOne({username:req.body.username}, (err, userObject) => {
        if(userObject){
            console.log('in db.users, userObject is:' + userObject)
            userPassword = userObject.password
            console.log(userPassword + ': userPassword')
            console.log(req.body.password +" : req.body password");
            let comparison = (bcrypt.compareSync(req.body.password, userPassword))
            console.log(comparison);
            if (bcrypt.compareSync(req.body.password, userPassword)){
                console.log("you have logged in, passwords match")
                res.cookie("loggedIn",'true');
                res.redirect('/')
            } else {
                console.log("Passwords Don't Match")
                res.cookie("loggedIn","false")
                res.redirect('/')
            }
        } else {
            console.log('User Not Found')
            res.cookie("loggedIn","false")
            res.redirect('/')
        }
    })
})

app.post('/courses/set', function(req, res) {
    let currentCourse = req.body.courseName;
    console.log(currentCourse);
    
    db.Courses.findOne({courseName:currentCourse}, (err,courseObject)=>{
        console.log('in db courses server side')
        console.log(courseObject);
        res.set('Content-Type', 'text/json');
        res.send(JSON.stringify(courseObject));      
    })
})

app.get('/', (req, res) => res.send('./login.html'))

app.get('/scorecardPage', (req, res) => res.render('/scorecard.html'))

app.listen(3000, () => console.log('listening on port 3000'))