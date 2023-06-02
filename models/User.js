const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    mail: { type: String },
    password: { type: String },
    businessName: { type: String },
    businessInfo: { type: Array },
    imagePath:{type: String},
    assumptionData: [{ type: mongoose.Schema.ObjectId, ref: "assumpventas" }],
    bienesData: [{ type: mongoose.Schema.ObjectId, ref: "bienes" }],
    volumenData: [{ type: mongoose.Schema.ObjectId, ref: "volumen" }],
    costoData: [{ type: mongoose.Schema.ObjectId, ref: "costo" }],
    gastosData: [{ type: mongoose.Schema.ObjectId, ref: "gastos" }],
    precioData: [{ type: mongoose.Schema.ObjectId, ref: "precio" }],
    puestosQData: [{ type: mongoose.Schema.ObjectId, ref: "puestosQ" }],
    puestosPxQData: [{ type: mongoose.Schema.ObjectId, ref: "puestosPxQ" }],
    puestosVData: [{ type: mongoose.Schema.ObjectId, ref: "puestosV" }],
    assumpFinancierasData: [{ type: mongoose.Schema.ObjectId, ref: "assumpfinancieras" }],
    gastosGeneralData: [{ type: mongoose.Schema.ObjectId, ref: "gastosGeneral" }],
    gastosPorCCData: [{ type: mongoose.Schema.ObjectId, ref: "gastosPorCC" }],
    puestosPData:[{ type: mongoose.Schema.ObjectId, ref: "puestosP" }],
    capexPData:[{ type: mongoose.Schema.ObjectId, ref: "capexP" }],
    capexQData:[{ type: mongoose.Schema.ObjectId, ref: "capexQ" }]

   
})

const User = mongoose.model('user', userSchema)

module.exports = User