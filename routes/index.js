const express = require('express')
const assumptionVentaController = require('../controllers/assumptionVentaController')
const bienesController = require('../controllers/bienesController')
const costoController = require('../controllers/costoController')
const gastoController = require('../controllers/gastosController')
const precioController = require('../controllers/precioController')
const puestosQController = require('../controllers/puestosQController')
const puestosVController = require('../controllers/puestosVController')
const userController = require('../controllers/userController')
const volumenController = require('../controllers/volumenController')



const router = express.Router()

router.route('/signup')
    .post(userController.signUp)

router.route('/signin')
    .post(userController.signIn)

router.route('/users/:id')
    .get(userController.eachUser)

router.route('/users')
    .get(userController.allUsers)

router.route('/assumpventa')
    .post(assumptionVentaController.createAssump)

router.route('/volumen')
    .post(volumenController.newVolumen)

router.route('/bienes')
    .post(bienesController.newBienes)

router.route('/costo')
    .post(costoController.newCosto)

router.route('/gastos')
    .post(gastoController.newGasto)

router.route('/precio')
    .post(precioController.newPrecio)

router.route('/puestosq')
    .post(puestosQController.newPuestosQ)

router.route('/puestosv')
    .post(puestosVController.newPuestosV)


module.exports = router