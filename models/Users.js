const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    user_name: {
        type: String,
        require:true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    gender: {
        type: String,
        require: true
    },
    occupation: {
        type: String,
        require: true
    },
    phone_number: {
        type: String,
        require: true
    },
    salary: {
        type: Number,
        require: true
    },
    password_digest: {
        type: String,
        require: true
    }
}, {timestamps: true})

const Users = mongoose.model('users', UserSchema)

module.exports = Users