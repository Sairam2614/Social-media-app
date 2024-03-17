const express = require('express');
const mongoose = require('mongoose');

const mogooseURI = process.env.MONGO

mongoose.connect(mogooseURI, {});

var db = mongoose.connection;

db.on('connected', function(){
    console.log('Connect to mongoose successfully...');
})

module.exports = db;