const express = require('express')
const routes = express.Router()

const multer = require('../app/middlewares/multer')
const ProductController = require('../app/controllers/ProductController')
const SearchController = require('../app/controllers/SearchController')

const { onlyUsers } = require('../app/middlewares/session')

//Search
routes.get('/search', SearchController.index)

// Productsh
routes.get('/create', onlyUsers, ProductController.create)  // cadastro de produtos
routes.get('/:id', ProductController.show) 
routes.get('/:id/edit', onlyUsers, ProductController.edit) // edição de produtos


routes.post('/', onlyUsers, multer.array("photos",6), ProductController.post)
routes.put('/', onlyUsers, multer.array("photos",6), ProductController.put)
routes.delete('/', onlyUsers, ProductController.delete)


module.exports = routes