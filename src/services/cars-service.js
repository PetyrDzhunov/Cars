const Car = require('../models/Car');
const User = require('../models/User');
const { parseError } = require('../utils/parsers');

const createOffer = async(carData) => {
    let car = await Car.create(carData);
    await User.findByIdAndUpdate(carData.owner, { $push: { carsOwned: car._id } });
    return car;

};

const getAllCars = () => {
    return Car.find().lean();
};

const getAllCarsByUserId = (userId) => {
    return Car.find({ owner: userId }).lean();
};






module.exports = {
    createOffer,
    getAllCars,
    getAllCarsByUserId
}