const express = require('express')
const app = express()
const port = process.env.PORT || 8000

app.get('/', (req, res) => {
    res.send('Welcome to Fashion World server!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})