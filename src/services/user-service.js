const Car = require("../models/Car");
const User = require("../models/User");

const getFavouriteCarsByUserId = (userId) => {
    return User.findById(userId).select('favouriteCars -_id').populate('favouriteCars').lean();
};

const getAllCarsByUserId = (userId) => {
    return User.findById(userId).select('carsOwned -_id').populate('carsOwned').lean();
};

const buyCarById = async(userId, carId) => {
    let buyer = await User.findOne({ _id: userId }); // buyer
    let carToBeTraded = await Car.findOne({ _id: carId }); //car to be traded
    let currentOwner = carToBeTraded.owner;
    let seller = await User.findById(currentOwner);

    if (buyer.budget >= carToBeTraded.price) {
        //maham ot masiva na prodavacha kolata
        let index = seller.carsOwned.indexOf(carId) // find the index;
        seller.carsOwned.splice(index, 1); // remove it.
        //dobavqm mu kesha
        seller.budget += carToBeTraded.price;
        console.log(seller.budget);
        //smenqm sobstvennosta na kolata
        carToBeTraded.owner = buyer._id;
        //dobavqm go v masiva na kupuvacha
        buyer.carsOwned.push(carToBeTraded._id);
        console.log(buyer.carsOwned);
        //vzemam parite na kupuvacha
        buyer.budget -= carToBeTraded.price;
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