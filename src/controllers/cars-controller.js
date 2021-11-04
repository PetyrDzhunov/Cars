const router = require('express').Router();
const carService = require('../services/cars-service');
const { parseError } = require('../utils/parsers');

router.get('/create', (req, res) => {
    res.render('cars/create', { title: 'Create new car for sale' })
});

router.post('/create', async(req, res) => {
    const { brand, model, region, yearOfManufacture, engine, transmission, imageUrl, price } = req.body;
    try {
        const car = await carService.createOffer({ brand, model, region, yearOfManufacture, engine, transmission, imageUrl, price, owner: req.user._id });
        console.log(car._id);
        console.log('created');
        res.redirect('/');
    } catch (err) {
        const ctx = {
            errors: parseError(err),
            title: "Create new car sale",
        };
        res.render('cars/create', ctx);
    }
});

module.exports = router;