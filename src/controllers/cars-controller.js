const router = require('express').Router();
const carService = require('../services/cars-service');
const { parseError } = require('../utils/parsers');
const { isUser } = require('../middlewares/guards-middleware');

router.get('/create', (req, res) => {
    res.render('cars/create', { title: 'Create new car for sale' })
});

router.post('/create', isUser, async(req, res) => {
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

router.get('/my-cars', isUser, async(req, res) => {
    const cars = await carService.getAllCarsByUserId(req.user._id);
    res.render('cars/my-cars', { title: 'My cars page', cars });
});


router.get('/:carId/details', async(req, res) => {
    try {
        const car = await carService.getCarById(req.params.carId);
        const isOwner = car.owner == req.user?._id;
        const context = {
            ...car,
            isOwner,
            title:`${car.brand} ${car.model} details page`
        }
        res.render('cars/details', context );
    } catch (err) {
        const error = parseError(err);
        console.log(error);
        res.redirect('/');
    };
});




module.exports = router;