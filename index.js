const { port } = require('./src/configs')
const express = require('express')
const app = express()
const logger = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')

const mainNavigation = require('./src/routes')

// const whitelist = ['localhost:8001/product']
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }
app.listen(port, () => console.log(`This server is running on port ${port}`))
// app.use(cors('*'))
// app.options(cors(corsOptions))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', cors(), mainNavigation)
