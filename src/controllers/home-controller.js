const router = require('express').Router();
const carService = require('../services/cars-service');

router.get('/', async(req, res) => {
    const cars = await carService.getAllCars();
    res.render('home', { title: 'Car market homepage', cars })
});

router.get('/search', async(req, res) => {
    const cars = await carService.getAllCarsByQuery(req.query.text);
    // console.log(cars);
    res.render('search', { title: 'Search Cars', cars });
});



module.exports = router;