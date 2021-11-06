const Car = require("../models/Car");
const User = require("../models/User");

const getFavouriteCarsByUserId = (userId) => {
    return User.findById(userId).select('favouriteCars -_id').populate('favouriteCars').lean();
};

const getAllCarsByUserId = (userId) => {
    return User.findById(userId).select('carsOwned -_id').populate('carsOwned').lean();
};

// kupuvam q -> dobavih q v masiva mi , vze mi ot budgeta,


const buyCarById = async(userId, carId) => {
    const currentUser = await User.findById(userId).select('budget carsOwned'); // buyer
    const currentCar = await Car.findById(carId).select('price owner'); //car to be traded

    if (currentUser.budget >= currentCar.price) {
        // find the owner of the car a.k.a seller and remove it from his array of owned cars and add the price to his budget
        // currentCar.owner = userId;
        console.log(currentCar.owner);
        console.log('>>>>>>>>>>>>>..')
        console.log('>>>>>>>>>>>>>..')
        console.log('>>>>>>>>>>>>>..')
        console.log('>>>>>>>>>>>>>..')
        console.log('>>>>>>>>>>>>>..')
        const seller = await User.findOne({ owner: currentCar.owner });
        console.log(seller);
        // , { owner: userId, $inc: { budget: currentCar.price } });


        // push the car in the user's array  that is buying it
        // await User.findByIdAndUpdate(userId, { $push: { carsOwned: carId } });
        // remove the money from his budget;

        // await User.findByIdAndUpdate(userId, { $inc: { budget: -currentCar.price } });

        // make the owner of the car the user that bought it 
        // await Car.findByIdAndUpdate(carId, { owner: userId });
    } else {
        throw new Error("You don't have enough money to buy this car!");
    }

};





module.exports = {
    getFavouriteCarsByUserId,
    buyCarById,
    getAllCarsByUserId
}