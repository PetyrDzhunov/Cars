const Car = require('../models/Car');
const User = require('../models/User');

const createOffer = async(carData) => {
    let car = await Car.create(carData);
    console.log(carData.owner);
    await User.findByIdAndUpdate(carData.owner, { $push: { carsOwned: car._id } });
    return car;
};




module.exports = {
    createOffer
}