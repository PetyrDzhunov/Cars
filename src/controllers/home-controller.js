const router = require('express').Router();
const carService = require('../services/cars-service');

router.get('/', async(req, res) => {
    const cars = await carService.getAllCars();
    res.render('home', { title: 'Car market homepage', cars })
});

router.get('/search', (req, res) => {
    console.log(req.query.text);
    res.render('search', { title: 'Search Cars' });
});

module.exports = router;