const Car = require('../models/Car');
const User = require('../models/User');

const createOffer = async(carData) => {
    let car = await Car.create(carData);
    await User.findByIdAndUpdate(carData.owner, { $push: { carsOwned: car._id } });
    return car;
};

const getAllCars = () => {
    return Car.find().lean();
};


const getCarById = (id) => {
    return Car.findById(id).lean();
};

const deleteById = async(carId, userId) => {
    await User.findByIdAndUpdate(userId, { $pull: { carsOwned: carId } });
    return Car.findByIdAndDelete(carId);
};

const editCarById = (newCarData, carId) => {
    return Car.findByIdAndUpdate(carId, newCarData)
};

const addView = (carId) => {
    return Car.findByIdAndUpdate(carId, { $inc: { views: 1 } })
};

const addToFavourites = (carId, userId) => {
    return User.findByIdAndUpdate(userId, { $push: { favouriteCars: carId } });
};

const removeFromFavourites = (carId, userId) => {
    return User.findByIdAndUpdate(userId, { $pull: { favouriteCars: carId } });
};

const getAllCarsByQuery = async(query) => {
    if (query == '') {
        return;
    };
    console.log(query);
    let cars = await Car.find({ brand: { $regex: query, $options: '-i' } }).lean();
    console.log(cars);
    return cars;
};






module.exports = {
    createOffer,
    getAllCars,
    getCarById,
    deleteById,
    editCarById,
    addView,
    addToFavourites,
    removeFromFavourites,
    getAllCarsByQuery
}