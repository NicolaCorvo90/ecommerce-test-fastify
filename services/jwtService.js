const jwt = require('jsonwebtoken');
require("dotenv").config();

const jwtService = {
    generateToken: (user) => {
        if(!user) {
            throw new Error("Empty user");
        }
        if(!user._id) {
            throw new Error("Empty user id");
        }

        const payload = { user_id: user._id };
        var token = "";
        try {
            token = jwt.sign({payload}, process.env.SECRET_KEY);
        } catch(error) {
            throw new Error("Error generating token");
        }

        return token;
    },
    extractPayloadFromToken: (token) => {
        if(!token) {
            throw new Error("Empty token");
        }

        var { payload } = {};
        try {
            payload = jwt.verify(token, process.env.SECRET_KEY);
        } catch(error) {
            throw new Error("Error extracting token");
        }
        
        return payload;
    }
}

module.exports = jwtService;