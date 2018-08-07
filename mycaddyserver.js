const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const expressValidator = require('express-validator')
const mongojs = require('mongojs')
const db = mongojs('test', ['inventory'])
const app = express()

//  BODY PARSER MIDDLEWARE

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// SET STATIC PATH

app.use(express.static(path.join(__dirname, 'public')))

/////////////////////////////////////

app.post('/users/add/', function (req, res) {
    console.log(req.body)
    let newUser = {
        username: req.body.username,
        password: req.body.password
    }

    db.inventory.insert(newUser, function(result) {
        res.redirect('/')
    })
    
})

app.get('/', (req, res) => res.send('/index.html'))

app.listen(3000, () => console.log('listening on port 3000'))