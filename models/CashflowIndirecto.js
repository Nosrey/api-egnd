const mongoose = require('mongoose')

const cashflowIndirectoSchema = new mongoose.Schema({
    cajaYBancos: { type: String },
    cajaYBancosAnioUno: { type: String },
    resultadoNeto: { type: String },
    amortizaciones: { type: String },
    interesesPagados: { type: String },
    variacion: { type: String },
    FEOperativas: { type: String },
    inversiones: { type: String },
    financiacion: { type: String },
    pagoPrestamos: { type: String },
    FEfinanciacion: { type: String },
    variacionCajaYBco: { type: String },
    cajaYBancosAlCierre: { type: String },
    idUser: [{ type: mongoose.Schema.ObjectId, ref: "user" }],
})

const CashflowIndirecto = mongoose.model('cashflowindirecto', cashflowIndirectoSchema)

module.exports = CashflowIndirecto