const express = require('express')
const resultSights = require('./resultSights')

const app = express()
const port = 8222

app.use(express.json());
app.use(resultSights);


app.listen(port, () => {
    console.log(`Server online at http://localhost:${port}`)
})