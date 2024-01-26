const createError = require('http-errors')
const User = require('../models/user')
const { authSchema } = require('../helpers/validation-schema')
const { signAccessToken, signRefreshToken, verifyRefreshToken } = require('../helpers/jwt-helpers')
const Client = require('../helpers/init-redis')

const registerFunction = async (req, res, next) => {
    try {
        const { email, password, favourites } = req.body;
        const validate = { email: email, password: password }
        const result = await authSchema.validateAsync(validate);

        // Handle favourites without validation (as IDs aren't stored)
        if (favourites) {
            if (!Array.isArray(favourites)) {
                throw createError.BadRequest('Favourites must be an array');
            }
            // Store favourites on the user object directly (no validation)
            result.favourites = favourites;
        }

        const doesExist = await User.findOne({ email: result.email });
        if (doesExist) throw createError.Conflict(`${result.email} has already been registered`);

        const user = new User(result);
        const savedUser = await user.save();
        const accessToken = await signAccessToken(savedUser.id);
        const refreshToken = await signRefreshToken(savedUser.id);
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true, // Only set this in HTTPS context
            maxAge: 14 * 24 * 60 * 60 * 1000, // Set expiry time (e.g., 14 days)
        });
        res.send({ accessToken });
    } catch (error) {
        console.log(error);
        if (error.isJoi === true) error.status = 422;
        next(error);
    }
};


const logInFunction = async (req, res, next) => {
    try {
        const result = await authSchema.validateAsync(req.body)
        const user = await User.findOne({ email: result.email })
        if (!user) throw createError.NotFound('User not registered')

        const isMatch = await user.isValidPassword(result.password)
        if (!isMatch) throw createError.Unauthorized('Username/Password is not valid')
        const accessToken = await signAccessToken(user.id)
        const refreshToken = await signRefreshToken(user.id)
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true, // Only set this in HTTPS context
            maxAge: 14 * 24 * 60 * 60 * 1000, // Set expiry time (e.g., 14 days)
        });
        res.send({ accessToken });
        // res.send({ accessToken, refreshToken })
    } catch (error) {
        if (error.isJoi === true) return next(createError.BadRequest('Invalid Username/Password'))
        next(error)
    }
}

const refreshTokenFunction = async (req, res, next) => {
    try {
        const { refreshToken } = req.body
        if (!refreshToken) throw createError.BadRequest()
        const userId = await verifyRefreshToken(refreshToken)
        const accessToken = await signAccessToken(userId)
        const refToken = await signRefreshToken(userId)
        res.send({ accessToken, refToken })
    } catch (error) {
        next(error)
    }
}

const logOutFunction = async (req, res, next) => {
    try {
        const { refreshToken } = req.body
        if (!refreshToken) throw createError.BadRequest()
        const userId = await verifyRefreshToken(refreshToken)
        Client.DEL(userId, (err, value) => {
            if (err) {
                console.log(err.message)
                throw createError.InternalServerError()
            }
            console.log(value)
            res.sendStatus(204)
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    registerFunction,
    logInFunction,
    refreshTokenFunction,
    logOutFunction,
}