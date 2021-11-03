const User = require('../models/User');

exports.register = async(userData) => {
    const user = await new User(userData);
    console.log(user);

    return user.save();
};