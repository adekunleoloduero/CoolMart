const jwt = require('jsonwebtoken');
const config = require('../configs/config');


const authentication = (req, res, next) => {
    const token = req.cookies.access_token;
    if (token) {
        jwt.verify(accessToken, config.JWT_SECRET, (err, data) => {
            if (err) {
                return res.status(403).json('Invalid access token.');
            }
            req.user = data; //Add information about user contained in token, to the req object
            next();
        });

    } else {
        return res.status(401).json({ message: 'User must be logged in.' })
    }
}


const authorizeUserOrAdmin = (req, res, next) => {
    authentication(req, res, () => {
        const user = req.user;
        if (user.id == req.params.id || user.isAdmin) {
            next();
        } else {
            return res.status(401).json({ message: 'Unauthorized' });
        }
    })
}


const authorizeAdmin = (req, res, next) => {
    authentication(req, res, () => {
        const user = req.user;
        if (user.isAdmin) {
            next();
        } else {
            return res.status(401).json({ message: 'Unauthorized' });
        }
    })
}