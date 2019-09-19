const app = require('express').Router();
const { models } = require('./db');
const { Company, Product, Offering } = models;





app.get('/companies', (req, res, next)=> {
  Company.findAll()
    .then( companies => res.send(companies) )
    .catch(next);
});

app.get('/products', (req, res, next)=> {
  Product.findAll()
    .then( products => res.send(products) )
    .catch(next);
});

app.get('/offerings', (req, res, next)=> {
  Offering.findAll()
    .then( offereings => res.send(offereings) )
    .catch(next);
});

module.exports = app;
