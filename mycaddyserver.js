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
        password: req.body.password
    }

    users.insert(newUser, function(result) {
        res.redirect('/')
    })
    
})

app.post('/users/verify', function(req, res) {
    console.log(req.body)

    users.count(req.body, (err, usercount) => {
        console.log(usercount)
        if (usercount === 1) {
            console.log("you have logged in")
            res.cookie("loggedin", "true")
            res.redirect('/')
        } else {
            console.log("not logged in")
            res.redirect('/')
        }
    })
})

app.get('/', (req, res) => res.send('/index.html'))



app.listen(3000, () => console.log('listening on port 3000'))