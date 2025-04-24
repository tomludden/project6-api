require('dotenv').config()
const express = require('express')
const { connectDB } = require('./src/config/db')
const artistRouter = require('./src/api/routes/artists')
const albumRouter = require('./src/api/routes/albums')

const app = express()

connectDB()
console.log('Database URL:', process.env.DB_URL)

app.use(express.json())

app.use('/api/v1/artists', artistRouter)
app.use('/api/v1/albums', albumRouter)

app.listen(3000, () => {
  console.log('server running on http://localhost:3000')
})
