const router = require('express').Router();
const authService = require('../services/auth-service');
const { parseError } = require('../views/utils/parsers');
const { AUTH_COOKIE_NAME } = require('../constants');


router.get('/register', (req, res) => {
    res.render('auth/register', { title: 'Register Page' });
});

router.post('/register', async(req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
        await authService.register({ firstName, lastName, email, password });
        res.redirect('/auth/login');
    } catch (err) {
        const ctx = {
            errors: parseError(err),
            title: "Register Page"
        }
        res.render('auth/register', ctx);
    }

});


router.get('/login', (req, res) => {
    res.render('auth/login', { title: 'Login Page' });
});

router.post('/login', async(req, res) => {
    const { email, password } = req.body;
    try {
        let token = await authService.login({ email, password });
        res.cookie(AUTH_COOKIE_NAME, token);
        res.redirect('/');
    } catch (err) {
        const ctx = {
            errors: parseError(err)
        }
        res.render('auth/login', ctx);
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie(AUTH_COOKIE_NAME);
    res.redirect('/');
});


module.exports = router;