const { getUser } = require('../services/auth.service.js');

function checkForAuthentication(req, res, next) {
    const sessionID = req.cookies?.__sessionID;

    req.user = null;
    res.locals.user = null;

    if (!sessionID) return next();

    try {
        const user = getUser(sessionID);
        req.user = user;
        res.locals.user = user;
    } catch (err) {
        req.user = null;
        res.locals.user = null;
    }

    return next();
}

function restrictTo(roles = []) {
    return function (req, res, next) {
        if (!req.user) return res.redirect('/pages/login');
        if (!roles.includes(req.user.role)) return res.status(403).send('Not authorized');
        next();
    };
}

module.exports = { checkForAuthentication, restrictTo };
