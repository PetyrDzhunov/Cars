const router = require('express').Router();

router.get('/', (req, res) => {
    console.log(req.user);
    res.render('home', { title: 'Car market homepage' })
});

module.exports = router;