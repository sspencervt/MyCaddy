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


// TO ACCESS DATABASE FROM COMMAND LINE - NEED dbuser and password
// mongo ds225608.mlab.com:25608/mycaddy -u <dbuser> -p <dbpassword>

//  BODY PARSER MIDDLEWARE

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

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


app.post('/users/add/', function (req, res) {
    console.log(req.body)
    let newUser = {
        username: req.body.username,
        password: bcrypt.hashSync('req.body.password', 10)
    }

    users.insert(newUser, function(result) {
        res.redirect('/')
    })
    
})

app.post('/users/verify', function(req, res) {
console.log(req.body)
    let userPassword;

    db.Users.findOne({username:req.body.username}, (err, userObject) => {
        console.log('in db.users, userObject is:' + userObject)
        let userPassword = userObject.password
        console.log(userPassword + ': userPassword')

        if (bcrypt.compareSync('req.body.password', userPassword)){
            console.log("you have logged in, passwords match")
            res.cookie("loggedin", "true")
            res.redirect('/')
        } else {
            console.log("not logged in")
            res.redirect('/')
        }
    })
    // console.log(req.body)
    // console.log(req.body.username)
    // console.log(req.body.password)
    // users.count(req.body.username, req.body.password, (err, usercount) => {
    //     console.log(usercount)
    //     if (usercount === 1) {
    //         console.log("you have logged in")
    //         res.cookie("loggedin", "true")
    //         res.redirect('/')
    //     } else {
            
    //     }
    // })
})

app.get('/', (req, res) => res.send('/index.html'))

app.get('/scorecardPage', (req, res) => res.render('/scorecard.html'))

app.listen(3000, () => console.log('listening on port 3000'))