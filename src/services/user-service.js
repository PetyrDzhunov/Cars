const Car = require("../models/Car");
const User = require("../models/User");

const getFavouriteCarsByUserId = (userId) => {
    return User.findById(userId).select('favouriteCars -_id').populate('favouriteCars').lean();
};

const getAllCarsByUserId = (userId) => {
    return User.findById(userId).select('carsOwned -_id').populate('carsOwned').lean();
};

const buyCarById = async(userId, carId) => {
    let buyer = await User.findOne({ _id: userId });
    let carToBeTraded = await Car.findOne({ _id: carId });
    let currentOwner = carToBeTraded.owner;
    let seller = await User.findById(currentOwner);

    if (buyer.budget >= carToBeTraded.price) {
        let index = seller.carsOwned.indexOf(carId)
        seller.carsOwned.splice(index, 1);

        seller.budget += carToBeTraded.price;

        carToBeTraded.owner = buyer._id;

        buyer.carsOwned.push(carToBeTraded._id);

        buyer.budget -= carToBeTraded.price;
        res.locals.user.budget = buyer.budget;
        await buyer.save({ validateBeforeSave: false });
        await carToBeTraded.save({ validateBeforeSave: false });
        await seller.save({ validateBeforeSave: false });
    } else {
        throw new Error("You don't have enough money to buy this car!");
    }
};





module.exports = {
    getFavouriteCarsByUserId,
    buyCarById,
    getAllCarsByUserId
}