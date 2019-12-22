const db = require('../../models')
const Category = db.Category
const Continent = db.Continent
const Region = db.Region
const Country = db.Country
const pageLimit = 10

let countryController = {
  getCountries: (req, res) => {
    Country.findAndCountAll({
      include: [Category, Continent, Region],
      order: ['id']
    })
      .then(countries => {
        //let page = Number(req.query.page) || 1
        //let prev = page - 1 < 1 ? 1 : page - 1
        //let next = page + 1 > pages ? pages : page + 1
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
            for (let j = pageLimit * i; j <= pageLimit * i + 9; j++) {
              listWithPages[i + 1].push(temp[j])
            }
          }
          listWithPages[i + 1] = listWithPages[i + 1].filter(d => d) // 過濾掉 null
        }

        return res.json({
          allCountsInDB: allCountsInDB,
          allPages: allPages,
          pageLimit: pageLimit,
          countries: listWithPages,
          totalPage: totalPage,
          //page: page,
          //prev: prev,
          //next: next
        })
      })
  }
}

module.exports = countryController