const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config()

const port = process.env.PORT || 8000

app.use(cors());
app.use(bodyParser.json());

console.log(process.env.DB_USER);

app.get('/', (req, res) => {
    res.send('Welcome to Fashion World server!')
})




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.2uohe.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    console.log('connection error:', err);
    const productCollection = client.db("eCommerceDB").collection("products");
    console.log('database connection successfully')
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})