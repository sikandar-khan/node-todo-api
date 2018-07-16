const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const UserSechema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        minlength: 1,
        trim: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            require: true
        },
        token: {
            type: String,
            require: true
        }
    }]
});

UserSechema.methods.toJSON = function () {
    let user = this;
    let userObject = user.toObject();
    return _.pick(userObject, ['_id', 'email']);
}
UserSechema.methods.generateAuthToken = function () {
    let user = this;
    let access = 'auth';
    let token = jwt.sign({
        _id: user._id.toHexString(),
        access
    }, 'abc123').toString();
    user.tokens.push({
        access,
        token
    });
    return user.save().then(() => {
        console.log(token);
        return token;
    });
}

let User = mongoose.model('User', UserSechema);
module.exports = {
    User
}