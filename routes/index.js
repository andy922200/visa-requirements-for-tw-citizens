const apis = require('./apis')

module.exports = (app) => {
  app.use('/api', apis)
  //以下為測試用途，佈署請刪除 
  //app.get('*', (req, res) => res.status(404).send('Not Found'))
}