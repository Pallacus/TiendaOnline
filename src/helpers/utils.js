const jwt = require('jsonwebtoken');

const createToken = (user) => {
    const obj = {
        id: user._id,
        role: user.role
    }
    return jwt.sign(obj, process.env.SECRET_KEY)
}

module.exports = { createToken }

