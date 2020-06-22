'use strict'

let mongoose = require('mongoose')

const user_schema = mongoose.Schema({
    email:String,
    password: String,
    first_name: String,
    last_name: String,
    nick:String,
})

const post_schema = mongoose.Schema({
    title:String,
    body:String,
    author: user_schema,
})


let User = mongoose.model('User', user_schema)
let Post = mongoose.model('Post', post_schema)

module.exports = {User, Post}

