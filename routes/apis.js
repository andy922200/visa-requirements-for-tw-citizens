// .routes/apis.js
const express = require('express')
const router = express.Router()
const countryController = require('../controllers/api/countryController')

router.get('/visa/countries', countryController.getCountries)

module.exports = router