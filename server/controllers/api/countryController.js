const db = require('../../models')
const Category = db.Category
const Continent = db.Continent
const Region = db.Region
const Country = db.Country
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const path = require('path')
const pageLimit = 20

let countryController = {
  getAllCountries: (req, res) => {
    Country.findAndCountAll({
      include: [Category, Continent, Region],
      order: ['id']
    })
      .then(countries => {
        let allCountsInDB = countries.count
        let allPages = Math.ceil(allCountsInDB / pageLimit)
        let pages = Math.ceil(countries.rows.length / pageLimit)
        let totalPage = Array.from({ length: pages }).map((item, index) => index + 1)
        let listWithPages = new Object()
        let temp = countries.rows.map(country => ({
          ...country.dataValues
        }))

        for (let i = 0; i < pages; i++) {
          listWithPages[i + 1] = new Array()
          while (listWithPages[i + 1].length < pageLimit) {
            for (let j = pageLimit * i; j <= pageLimit * i + (pageLimit - 1); j++) {
              listWithPages[i + 1].push(temp[j])
            }
          }
          listWithPages[i + 1] = listWithPages[i + 1].filter(d => d) // 過濾掉 null
        }

        return res.json({
          allCountsInDB: allCountsInDB,
          allPages: allPages,
          originData: temp,
          pageLimit: pageLimit,
          countries: listWithPages,
          totalPage: totalPage,
        })
      })
  },
  getCountry: (req, res) => {
    let countryName = path.basename(req.path)
    Country.findOne({
      include: [Category, Continent, Region],
      order: ['id'],
      where: {
        [Op.or]: {
          name:
            { [Op.like]: '%' + countryName + '%' },
          nameEn:
            { [Op.like]: '%' + countryName + '%' }
        }
      }
    }).then(country => {
      return res.json({
        country: country
      })
    })
  },
  getMultipleCountries: (req, res) => {
    let query = req.query.q.split(',')
    query = query.map(item => {
      return { [Op.like]: '%' + item + '%' }
    })

    Country.findAndCountAll({
      include: [Category, Continent, Region],
      order: ['id'],
      where: {
        [Op.or]: {
          name: { [Op.or]: query },
          nameEn: {
            [Op.or]: query
          }
        }
      }
    }).then(countries => {
      let allCounts = countries.count
      let pages = Math.ceil(allCounts / pageLimit)
      let totalPage = Array.from({ length: pages }).map((item, index) => index + 1)
      let listWithPages = new Object()
      let temp = countries.rows.map(country => ({
        ...country.dataValues
      }))

      for (let i = 0; i < pages; i++) {
        listWithPages[i + 1] = new Array()
        while (listWithPages[i + 1].length < pageLimit) {
          for (let j = pageLimit * i; j <= pageLimit * i + (pageLimit - 1); j++) {
            listWithPages[i + 1].push(temp[j])
          }
        }
        listWithPages[i + 1] = listWithPages[i + 1].filter(d => d) // 過濾掉 null
      }

      return res.json({
        allCounts: allCounts,
        originData: temp,
        countries: listWithPages,
        totalPage: totalPage
      })
    })
  }
}

module.exports = countryController