const express = require('express')
const routes = express.Router()

const HomeController = require('../app/controllers/HomeController')

const products = require('./products')
const users = require('./users')


routes.get('/', HomeController.index)

routes.use('/products', products)
// routes.use('/users', users)

//Alias
routes.get('/ads/create', function(req, res) { // mascara que vai redirecionar para o products create
    return res.render("/products/create")
})


module.exports = routes