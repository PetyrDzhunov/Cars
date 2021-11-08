const router = require('express').Router();
const carService = require('../services/cars-service');
const userService = require('../services/user-service');

router.get('/', async(req, res) => {
    const cars = await carService.getAllCars();
    if (req.user) {
        const { budget } = await userService.getBudgetById(req.user._id);
        const context = {
            cars,
            budget,
        };
        res.render('home', { title: 'Car market homepage', ...context })
    } else {
        res.render('home', { title: 'Car market homepage', cars });
    };

});


router.get('/search', async(req, res) => {
    const cars = await carService.getAllCarsByQuery(req.query.text);
    if (req.user) {
        const { budget } = await userService.getBudgetById(req.user._id);
        const context = {
            cars,
            budget,
        };
        res.render('search', { title: 'Search Cars', ...context });
    } else {
        res.render('search', { title: 'Search Cars', cars });
    };
});



module.exports = router;