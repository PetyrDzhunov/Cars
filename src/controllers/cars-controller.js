const router = require('express').Router();
const carService = require('../services/cars-service');
const { parseError } = require('../utils/parsers');

router.get('/create', (req, res) => {
    res.render('cars/create', { title: 'Create new car for sale' })
});

router.post('/create', async(req, res) => {
    const { brand, model, region, yearOfManufacture, engine, gearbox, imageUrl, price } = req.body;
    try {
        const car = await carService.createOffer({ brand, model, region, yearOfManufacture, engine, gearbox, imageUrl, price, owner: req.user._id });
        res.redirect('/');
    } catch (err) {
        const ctx = {
            errors: parseError(err),
            title: "Create new car sale",
            brand,
            model,
            region,
            yearOfManufacture,
            engine,
            gearbox,
            imageUrl,
            price
        };
        res.render('cars/create', ctx);
    }
});

router.get('/my-cars', async(req, res) => {
    const cars = await carService.getAllCarsByUserId(req.user._id);
    res.render('cars/my-cars', { title: 'My cars page', cars });
});

module.exports = router;