const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const methodOverride = require('method-override')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')

// 開啟跨網域連線
app.use(cors())
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const db = require('./models')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(methodOverride('_method'))

app.use(
  session({
    secret: 'visaForTW',
    name: 'acaaa',
    cookie: { maxAge: 86400000 },
    resave: false,
    saveUninitialized: true
  })
)

/*localStorage Settings*/
/*app.use((req, res, next) => {
  res.locals.user = req.user
})*/

require('./routes/')(app)

app.listen(port, () => {
  console.log(`The app is listening on port ${port}`)
})
