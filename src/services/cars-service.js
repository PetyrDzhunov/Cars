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

const getAllCarsByUserId = (userId) => {
    return Car.find({ owner: userId }).lean();
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





module.exports = {
    createOffer,
    getAllCars,
    getAllCarsByUserId,
    getCarById,
    deleteById,
    editCarById,
    addView
}