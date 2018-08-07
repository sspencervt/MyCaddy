const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()

//  BODY PARSER MIDDLEWARE

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// SET STATIC PATH

app.use(express.static(path.join(__dirname, 'public')))

/////////////////////////////////////

app.get('/', (req, res) => res.send('/index.html'))

app.listen(3000, () => console.log('listening on port 3000'))