const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true
    }
})

// this will add on a bunch of method to UserSchema
UserSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('User', UserSchema)