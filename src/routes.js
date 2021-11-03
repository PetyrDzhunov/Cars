const router = require('express').Router();
const homeController = require('./controllers/home-controller');

router.use('/', homeController);

module.exports = router;