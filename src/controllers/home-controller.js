const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('home', { title: 'Car market homepage' })
});


module.exports = router;