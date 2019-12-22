let apis = require('./apis')

module.exports = (app) => {
  app.use('/api', apis)
  app.get('*', (req, res) => {
    res.status(404).send({ error: 'Please check your request again.' })
  })
}