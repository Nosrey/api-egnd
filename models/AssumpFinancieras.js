const mongoose = require('mongoose')

const assumpFinancierasSchema = new mongoose.Schema({

    cobranzas: { type: Object },
    pagoProducto: { type: Object },
    pagoServicio: { type: Object },
    stock: { type: String },
    inversion: { type: Object },
    idUser: [{ type: mongoose.Schema.ObjectId, ref: "user" }],


})

const assumpFinancieras = mongoose.model('assumpfinancieras', assumpFinancierasSchema)

module.exports = assumpFinancieras