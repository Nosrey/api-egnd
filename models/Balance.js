const mongoose = require('mongoose')

const BalanceSchema = new mongoose.Schema({

    cajaYBancos: { type: String },
    creditosPorVentas: { type: String },
    creditosFiscales: { type: String },
    bienesDeCambio: { type: String },
    bienesDeUso: { type: String },
    deudasComerciales: { type: String },
    deudasFiscales: { type: String },
    deudasFinancieras: { type: String },
    otrasDeudas: { type: String },
    equity: { type: String },
    resultadosNoAsignados: { type: String },
    resultadosDelEjercicio: { type: String },
    idUser: [{ type: mongoose.Schema.ObjectId, ref: "user" }],

})

const Balance = mongoose.model('balance', BalanceSchema)

module.exports = Balance