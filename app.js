const express = require('express');
const app = express();
const mongo = require('mongoose');
const Product = require('./models/product');

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.listen(4000, () => {
    console.log('server connected');
});

mongo.connect('mongodb+srv://dstr1:1357902468@mmagdydb.otulj0s.mongodb.net/dummy4deletion')
    .then(() => {
        console.log('connected to database');
    })
    .catch((err) => {
        console.log('error connecting to database');
});

app.get('/products', (req, res) => {
    Product.find()
        .then((foundProducts) => {
            res.send(foundProducts);
        })
        .catch((err) => {
            res.send(err);
    });
});
//welcome to our APIs
app.get('/home', (req, res) => {
    res.send("welcome to our api");
});
app.get('/', (req, res) => {
    res.send("welcome to our api");
});


app.get('/product/:id', (req, res) => {

    let id = +req.params.id;
    Product.findOne({id: id})
        .then((foundProduct) => {
            res.send(foundProduct);
        })
        .catch((err) => {
            console.log(err);
    });
});

app.post('/addProduct', (req, res) => {
    let productData = req.body;
    let newProduct = new Product({
        id: +productData.id,
        name: productData.name,
        price: +productData.price,
        color: productData.color
    });
    newProduct.save()
        .then((msg) => {
            res.send({
                msg: "Product added successfully"
            });
        })
        .catch((err) => {
            console.log(err);
    });
});

app.put('/product/:id', (req, res) => {
    let id = +req.params.id;
    Product.updateOne({id: id}, {
        name: req.body.name
    })
    .then((msg) => {
        res.send({
            msg: "Product updated successfully"
        });
    })
    .catch((err) => {
        console.log(err);
    });
});

app.delete('/product/:id', (req, res) => {
    let id = +req.params.id;
    Product.deleteOne({id: id})
    .then((msg) => {
        res.send({
            msg: "Product deleted successfully"
        });
    })
    .catch((err) => {
        console.log(err);
    });
});