//imports and dependancies
const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const createError = require('http-errors')
const { verifyAccessToken } = require('./helpers/jwt-helpers')

//create express app
const app = express()

//middleware
app.use(morgan('dev'))
app.use(cookieParser())
app.use(express.json())
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.urlencoded({ extended: true }))


//route handlers
const authRoute = require('./routes/auth-route')
const favRoute = require('./routes/favourites')

app.use('/auth', authRoute)
app.use('/fav', favRoute)

app.get('/', verifyAccessToken, async (req, res, next) => {
    console.log(req.headers['authorization'])
    res.send('Hello from express')
})

//environment configuration
require('dotenv').config()

//database connection
require('./helpers/mongodb-connection')
require('./helpers/init-redis')


//error handling middleware
app.use(async (req, res, next) => {
    next(createError.NotFound('This route does not exist'))
})
app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
})

//server listenning
const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server is listenning on port ${PORT}`)
})









