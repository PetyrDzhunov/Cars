const router = require('express').Router();

router.get('/create', (req, res) => {
    res.render('cars/create', { title: 'Create new car for sale' })
});

module.exports = router;