const User = require('../models/User');
const { JWT_SECRET } = require('../constants');
const jwt = require('../utils/jwt');
const bcrypt = require('bcrypt');
const { SALT_ROUNDS } = require('../constants');

exports.register = async(userData) => {
    const existing = await User.findOne({ email: userData.email });
    if (existing) {
        throw new Error('Account with this email has already been created!');
    };
    let user = new User(userData);
    return user.save();
};

exports.login = async({ email, password }) => {
    let user = await User.findOne({ email });

    if (!user) {
        throw new Error('Invalid username or password');
    };

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const isValid = await bcrypt.compare(password, hashedPassword);

    if (!isValid) {
        throw new Error('Invalid username or password');
    };

    let payload = { _id: user._id, name: user.firstName, email: user.email, carsOwned: user.carsOwned, budget: user.budget };

    let token = await jwt.sign(payload, JWT_SECRET);
    return token;
};