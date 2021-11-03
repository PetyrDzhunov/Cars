const router = require('express').Router();
const authService = require('../services/auth-service');


router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async(req, res) => {
    const { firstName, lastName, email, password } = req.body;
    await authService.register({ firstName, lastName, email, password });
    res.redirect('/auth/login');
});


router.get('/login', (req, res) => {
    res.render('auth/login');
});




module.exports = router;