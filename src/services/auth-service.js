const User = require('../models/User');
const { JWT_SECRET } = require('../constants');
const jwt = require('../utils/jwt');

exports.register = async(userData) => {
    const existing = await User.findOne({ email: userData.email });
    if (existing) {
        throw new Error('Account with this email has already been created!');
    };
    return User.create(userData);
};

exports.login = async({ email, password }) => {
    let user = await User.findOne({ email });

    if (!user) {
        throw new Error('Invalid username or password');
    };

    let isValid = await user.validatePassword(password);
    if (!isValid) {
        throw new Error('Invalid username or password');
    };

    let payload = { _id: user._id, name: user.firstName, email: user.email, carsOwned: user.carsOwned };

    let token = await jwt.sign(payload, JWT_SECRET);
    return token;
};