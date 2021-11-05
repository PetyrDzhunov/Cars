const User = require("../models/User");

const getFavouriteCarsByUserId = (userId) => {
    return User.findById(userId).select('favouriteCars -_id').populate('favouriteCars').lean();
};



module.exports = {
    getFavouriteCarsByUserId,
}