const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { SALT_ROUNDS } = require('../constants');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name field has to be filled!'],
        minlength: [3, 'Your first name should be at least 3 characters long.'],
        maxlength: [20, 'Your first name should be maximum 20 characters long'],
        trim: true,
    },
    lastName: {
        type: String,
        required: [true, 'Last name field has to be filled!'],
        minlength: [3, 'Your last name should be at least 3 characters long.'],
        maxlength: [20, 'Your last name should be maximum 20 characters long'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'You can\'t register without email!'],
        validate: [/^[A-Za-z0-9.]+@[A-Za-z0-9]{2,8}\.[A-Za-z0-9]{2,6}$/, 'Incorrect email'],
        trim: true,

    },
    password: {
        type: String,
        required: [true, 'You can\'t register without password!'],
        minlength: [6, 'Your password should be at least 6 characters'],
        maxlength: [30, 'Your password can\'t be longer than 30 characters'],
        trim: true,
    },
    carsOwned: [{ type: mongoose.Schema.Types.ObjectId, ref: "Car", default: [] }],
    favouriteCars: [{ type: mongoose.Schema.Types.ObjectId, ref: "Car", default: [] }],
    budget: {
        type: Number,
        default: 20000,
        trim: true,
    },
});

userSchema.pre('save', function(next) {
    bcrypt.hash(this.password, SALT_ROUNDS)
        .then((hashedPassword) => {
            this.password = hashedPassword
            next();
        })
        .catch(err => console.log('Failed to hash password', err));
});

const User = mongoose.model('User', userSchema);

module.exports = User;