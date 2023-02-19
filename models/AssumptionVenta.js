const mongoose = require('mongoose')

const assumptionVentaSchema = new mongoose.Schema({
    canales: { type: Array },
    churns: { type: Array },
    paises: { type: Array },
    productos: { type: Array },
    idUser: [{ type: mongoose.Schema.ObjectId, ref: "user" }],
})

const AssumptionVenta = mongoose.model('assumpventas', assumptionVentaSchema)

module.exports = AssumptionVenta