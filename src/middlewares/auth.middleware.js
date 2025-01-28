const jwt = require('jsonwebtoken');
const { FailureResponse } = require('../models/response.model');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']; // Expecting "Bearer <token>"

    if (!token) {
        return res.status(401).json(new FailureResponse(false, 401, "No token provided", []));
    }

    const tokenParts = token.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
        return res.status(400).json(new FailureResponse(false, 400, "Invalid token format", []));
    }

    jwt.verify(tokenParts[1], process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json(new FailureResponse(false, 401, "Unauthorized: Invalid token", []));
        }

        req.userId = decoded.userId; // Attach userId to the request object
        next();
    });
};

module.exports = verifyToken;
