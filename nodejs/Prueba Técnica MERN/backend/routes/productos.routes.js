const routes = require('express').Router();

const {getproductos, agregarProducto}= require('../controllers/productos')

//Traer todos los productos
routes.get('/all',getproductos)//localhost:8005/api/productos/all

//Ingresar un nuevo producto
routes.post('/new',agregarProducto)//localhost:8005/api/productos/new
module.exports = routes