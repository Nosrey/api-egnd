const express = require('express')
const assumpFinancierasController = require('../controllers/assumpFinancieras')
const assumptionVentaController = require('../controllers/assumptionVentaController')
const bienesController = require('../controllers/bienesController')
const costoController = require('../controllers/costoController')
const gastoController = require('../controllers/gastosController')
const precioController = require('../controllers/precioController')
const puestosQController = require('../controllers/puestosQController')
const puestosVController = require('../controllers/puestosVController')
const userController = require('../controllers/userController')
const volumenController = require('../controllers/volumenController')
const gastosGeneralController = require('../controllers/gastosGeneralController')
const puestosPxQController = require('../controllers/puestosPxQController')
const GastosPorCCController = require('../controllers/gastosPorCCController')
// const multer = require('multer');
// const upload = multer();
const router = express.Router()

router.route('/signup')
    .post(userController.signUp)

router.route('/signin')
    .post(userController.signIn)

router.route('/users/:id')
    .get(userController.eachUser)
    .put(userController.updateBusinessInfo)

router.route('/users')
    .get(userController.allUsers)

router.route('/assumpventa')
    .post(assumptionVentaController.createAssump)

router.route('/volumen')
    .post(volumenController.newVolumen)
    .delete(volumenController.deleteVolumen)

router.route('/bienes')
    .post(bienesController.newBienes)

router.route('/costo')
    .post(costoController.newCosto)

router.route('/gastos')
    .post(gastoController.newGasto)

router.route('/precio')
    .post(precioController.newPrecio)
    .delete(precioController.deletePrecio)

router.route('/puestosq')
    .post(puestosQController.newPuestosQ)

router.route('/puestosv')
    .post(puestosVController.newPuestosV)

router.route('/assumpfinanciera')
    .post(assumpFinancierasController.newAssumpFinancieras)

router.route('/gastosgeneral')
    .post(gastosGeneralController.newGastosGeneral)

router.route('/puestospxq')
    .post(puestosPxQController.newPuestosPxQ)

router.route('/gastosporcc')
    .post(GastosPorCCController.newGastosPorCC)

module.exports = router