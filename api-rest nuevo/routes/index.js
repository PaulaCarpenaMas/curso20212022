'use stric'

const express = require('express')
const ProductCtrl=require('../controllers/product')
const userCtrl=require('../controllers/auth')
const auth=require('../middlewares/auth')
const api = express.Router()

api.get('/product',auth, ProductCtrl.getProducts)
api.get('/product/:productId',ProductCtrl.getProduct)
api.post('/product',ProductCtrl.saveProduct)
api.put('/product/:productId',ProductCtrl.updateProduct)
api.delete('/product/:productId',ProductCtrl.deleteProduct)
api.post('/signup', userCtrl.signUp)
api.post('/signin', userCtrl.singIn)
api.get('/private', auth, function(req,res){
    res.status(200).send({message:'tienes acceso'})
})

module.exports=api