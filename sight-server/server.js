const express = require('express')
const cors = require('cors')
const resultSights = require('./resultSights')

const port = 8222
const app = express()

app.use(cors());
app.use(express.json());
app.use(resultSights);

app.listen(port, () => {
    console.log(`Server online at http://localhost:${port}`)
})