const { Schema, model } = require('mongoose');

new Schema({
    username: String,
    email: String,
    password: String
});