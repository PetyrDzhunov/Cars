const router = require('express').Router();
const homeController = require('./controllers/home-controller');
const authController = require('./controllers/auth-controller');
const carsController = require('./controllers/cars-controller');

router.use('/', homeController);
router.use('/auth', authController);
router.use('/cars', carsController);


router.use('*', (req, res) => {
    res.render('404');
});

module.exports = router;