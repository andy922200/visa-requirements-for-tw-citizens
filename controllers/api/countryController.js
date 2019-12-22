const db = require('../../models')
const Category = db.Category
const Country = db.Country

let countryController = {
  getCountries: (req, res) => {
    Country.findAll().then(countries => {
      return res.json(countries)
    })
  }
}

module.exports = countryController