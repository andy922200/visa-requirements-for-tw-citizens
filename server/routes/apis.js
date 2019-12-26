// .routes/apis.js
const express = require('express')
const router = express.Router()
const countryController = require('../controllers/api/countryController')

router.get('/visa/countries', countryController.getAllCountries)
router.get('/visa/countries/search', countryController.getMultipleCountries)
router.get('/visa/countries/*', countryController.getCountry)

module.exports = router