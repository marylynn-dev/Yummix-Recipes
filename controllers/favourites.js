const createError = require('http-errors')
const User = require('../models/user')
const mongoose = require('mongoose')

const removeFavourite = async (req, res, next) => {
    try {
        const { userId, recipeId } = req.body;

        // Validate user ID and recipe ID
        if (!mongoose.Types.ObjectId.isValid(userId) || typeof recipeId !== 'number') {
            throw createError.BadRequest('Invalid user or recipe ID');
        }

        // Check if user exists
        const user = await User.findById(userId);
        if (!user) throw createError.NotFound('User not found');

        // Check if recipe is a favorite
        if (!user.favourites.includes(recipeId)) {
            throw createError.NotFound('Recipe not a favourite');
        }

        // Remove recipe from favourites array
        const index = user.favourites.indexOf(recipeId);
        user.favourites.splice(index, 1);

        // Save updated user
        await user.save();

        res.status(200).send({ message: 'Recipe removed from favourites successfully' });
    } catch (error) {
        console.log(error);
        if (error.isJoi === true) error.status = 422;
        next(error);
    }
};

const addFavourite = async (req, res, next) => {
    try {
        const { userId, recipeId } = req.body;

        // Validate user ID and recipe ID (number)
        if (!mongoose.Types.ObjectId.isValid(userId) || typeof recipeId !== 'number') {
            throw createError.BadRequest('Invalid user or recipe ID');
        }

        // Check if user exists
        const user = await User.findById(userId);
        if (!user) throw createError.NotFound('User not found');

        // Check for duplicate (avoid adding it again)
        if (user.favourites.includes(recipeId)) {
            throw createError.BadRequest('Recipe already a favourite');
        }

        // Update favourites array with the recipe ID
        user.favourites.push(recipeId);

        // Save updated user
        await user.save();

        res.status(200).send({ message: 'Favourites updated successfully' });
    } catch (error) {
        console.log(error);
        if (error.isJoi === true) error.status = 422;
        next(error);
    }
};

module.exports = {
    removeFavourite,
    addFavourite
}