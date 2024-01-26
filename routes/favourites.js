const express = require('express')
const router = express.Router()
const { addFavourite, removeFavourite } = require('../controllers/favourites')


router.delete('/remove-favourite', removeFavourite)
router.put('/add-favourite', addFavourite)

module.exports = router