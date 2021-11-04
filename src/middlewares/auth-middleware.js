const { AUTH_COOKIE_NAME, JWT_SECRET } = require("../constants");
const jwt = require('../utils/jwt');
exports.isAuth = (req, res, next) => {
    let token = req.cookies[AUTH_COOKIE_NAME];
    if (token) {
        jwt.verify(token, JWT_SECRET)
            .then(decodedToken => {
                req.user = decodedToken;
                res.locals.user = decodedToken;
                next();
            })
            .catch(err => {
                console.log(err);
                res.clearCookie(AUTH_COOKIE_NAME);
                res.redirect('/auth/login');
            })
    } else {
        next();
    }
};