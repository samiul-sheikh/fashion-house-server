const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config()

const port = process.env.PORT || 8000

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Welcome to Fashion World server!')
})

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.2uohe.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    console.log('connection error:', err);
    const productCollection = client.db("eCommerceDB").collection("products");
    const orderCollection = client.db("eCommerceDB").collection("orderProduct");

    // product added in database
    app.post('/addProduct', (req, res) => {
        const newProduct = req.body;
        console.log('adding new product: ', newProduct);
        productCollection.insertOne(newProduct)
            .then(result => {
                console.log('inserted count ', result.insertedCount)
                res.send(result.insertedCount > 0)
            })
    })

    // display products from database
    app.get('/products', (req, res) => {
        productCollection.find()
            .toArray((err, products) => {
                res.send(products)
                console.log('from database', products)
            })
    })

    // display buy product from database in checkout
    app.get('/product/:id', (req, res) => {
        const id = ObjectID(req.params.id);
        productCollection.find({_id: id})
            .toArray((err, product) => {
                res.send(product[0])
                // console.log('from database', product[0])
            })
    })
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})