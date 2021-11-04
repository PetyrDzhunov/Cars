const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: [true, 'You must fill the brand field!'],
        trim: true
    },
    model: {
        type: String,
        required: [true, 'You must fill the model field!'],
        trim: true
    },
    region: {
        type: String,
        required: [true, 'You must fill the region field!'],
        trim: true
    },
    yearOfManufacture: {
        type: Number,
        required: [true, 'You must enter year of manufacture!'],
        min: [1980, 'The car you want to sale should be manufactured after 1980 year'],
        max: [2022, 'The car you want to sale should be manufactured before 2022 year'],
        trim: true
    },
    engine: {
        type: String,
        enum: ['diesel', 'gasoline', 'electric'],
        required: [true, 'You must enter engine between diesel , gasoline or electric']
    },
    transmission: {
        type: String,
        required: [true, 'You must enter transmission between automatic and manual'],
        enum: ['automatic', 'manual'],
        trim: true
    },
    imageUrl: {
        type: String,
        validate: [/^https?:\/\//i, 'The image you provided us is invalid!'],
        required: [true, 'You must fill the imageUrl field!'],
        trim: true
    },
    price: {
        type: Number,
        default: 0,
        required: [true, 'You must fill what\'s the price of the car'],
        trim: true
    },
    views: {
        type: Number,
        default: 0,
        trim: true
    },
    comments: {
        type: Array,
        default: [],
        trim: true
    },
    owner: { type: mongoose.Types.ObjectId, ref: "User" }
}, { timestamps: true });


const Car = mongoose.model('Car', carSchema);
module.exports = Car;