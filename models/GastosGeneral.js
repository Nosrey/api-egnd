const mongoose = require('mongoose')

const gastosGeneralSchema = new mongoose.Schema({
    centroDeGastos: {type: Object},
    cargasSociales:{ type:Number},
    idUser: [{ type: mongoose.Schema.ObjectId, ref: "user" }],
})

const GastosGeneral = mongoose.model('gastosGeneral', gastosGeneralSchema)

module.exports = GastosGeneral