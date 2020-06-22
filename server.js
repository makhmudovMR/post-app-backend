const express = require('express')
const mongoose = require('mongoose')
const models = require('./model')
const body_parser = require('body-parser')
const jwt = require('jsonwebtoken')
const cors = require('cors')

const app = express();
app.use('*',function(req,res, next){
    res.set('Access-Control-Allow-Origin',"*");
    res.set('Access-Control-Allow-Headers',"GET,HEAD,PUT,PATCH,POST,DELETE");
    next()
})
app.use(function (req, res, next) {
    console.log('Time')
    next()
  })

app.use(cors({origin: true}));
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));

mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true });
let db = mongoose.connection

db.on('error', (error) => console.log(error))
db.once('open', () => console.log('connect to database'))

app.listen(3000, () => console.log('Server is working'))


app.post('/registration', (req, res) => {
    let user = new models.User({
        email: req.body.email,
        password: req.body.password,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        nick: req.body.nick,
    })
    user.save();
    res.send({
        message: 'user is added',
        instance: user
    })
    res.send()
})

app.post('/login', cors(), (req, res) => {
    models.User.findOne({ email: req.body.email }, (err, user) => {
        if (user.password == req.body.password) {
            let token = jwt.sign({ user_id: user._id }, 'secret_key')
            res.send({
                user,
                token,
            })
        }
    })
})

app.get('/allpost', (req, res) => {
    models.Post.find({}, (err, posts) => {
        res.send(posts)
    })
})

app.get('/all', (req, res) => {
    models.User.find({}, (err, users) => {
        res.send(users)
    })
})
