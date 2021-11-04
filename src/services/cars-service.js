const Car = require('../models/Car');

const createOffer = async(carData) => {
    let car = await Car.create(carData);
    await car.save();
    return car;
};




module.exports = {
    createOffer
}