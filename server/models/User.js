const mongoose = require('mongoose');
const express = require('express');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    address2: {
        type: String,
    },
    city: {
        type: String,
        default: 'General',
    },
    email : {
        type :String,
        required : true
    },
    password:{
        type:String,
        required:true
    },
    date: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('users',UserSchema)