const router = require('express').Router();
const authService = require('../services/auth-service');
const { parseError } = require('../views/utils/parsers');


router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async(req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
        await authService.register({ firstName, lastName, email, password });
        res.redirect('/auth/login');
    } catch (err) {
        // const errors = parseError(err);
        const ctx = {
            errors: parseError(err),
        }
        res.render('auth/register', ctx);
    }

});


router.get('/login', (req, res) => {
    res.render('auth/login');
});




module.exports = router;