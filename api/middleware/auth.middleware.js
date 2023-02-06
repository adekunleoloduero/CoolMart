const jwt = require('jsonwebtoken');
const config = require('../configs/config');



//Retrieves and verify access token 
const authenticateUser = (req, res, next) => {
    const token = req.cookies.access_token;
    if (token) {
        jwt.verify(token, config.JWT_SECRET, (err, data) => {
            if (err) {
                return res.status(403).json('Invalid Access Token.');
            }
            req.user = data; //Add information about user contained in token, to the req object
            next();
        });

    } else {
        return res.status(401).json({ message: 'User must be logged in.' })
    }
}


//Authorize either current user or an Admin
const authorizeUserOrAdmin = (req, res, next) => {
    const user = req.user;
    if (user._id == req.params.userId || user.role == 'admin') {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}


//Authorize an admin
const authorizeAdminOnly = (req, res, next) => {
    const user = req.user;
    if (user.role == 'admin') {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}



module.exports = {
    authenticateUser,
    authorizeUserOrAdmin,
    authorizeAdminOnly
}