const mongoose = require('mongoose')

const plSchema = new mongoose.Schema({
    vtasTot: { type: String },
    vtasProd: { type: String },
    vtasServ: { type: String },
    costoProd: { type: String },
    costoServ: { type: String },
    costoProduccionTotal: { type: String },
    costoComision: { type: String },
    costoImpuesto: { type: String },
    costoCargos: { type: String },
    costoComerciales: { type: String },
    costoTotales: { type: String },
    MBPesos: { type: String },
    MBPorcentaje: { type: String },
    ctasListado: { type: String },
    gastoEnCtas: { type: Array },
    gastoEnCtasTotal: { type: String },
    EBITDA: { type: String },
    EBITDAPorcentaje: { type: String },
    amortizaciones: { type: String },
    EBIT: { type: String },
    EBITPorcentaje: { type: String },
    intereses: { type: String },
    BAT: { type: String },
    IIGG: { type: String },
    rdoNeto: { type: String },
    RNPorcentaje: { type: String },
    idUser: [{ type: mongoose.Schema.ObjectId, ref: "user" }],
})

const Pl = mongoose.model('pl', plSchema)

module.exports = Pl