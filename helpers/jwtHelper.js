const { signAccessTokenFunction, verifyAccessTokenFunction, signRefreshTokenFunction, verifyRefreshTokenFunction } = require('../controllers/jwt.helpers.controller')

module.exports = {
    signAccessToken: signAccessTokenFunction,

    verifyAccessToken: verifyAccessTokenFunction,

    signRefreshToken: signRefreshTokenFunction,

    verifyRefreshToken: verifyRefreshTokenFunction,


}