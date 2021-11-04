exports.isUser = (req, res, next) => {
    if (!req.user) {
        res.redirect('/login');
    } else {
        next();
    };
};

exports.isGuest = (req, res, next) => {
    if (!req.user) {
        next();
    } else {
        res.redirect('/');
    };
};