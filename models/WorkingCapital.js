const mongoose = require('mongoose')

const workingCapitalSchema = new mongoose.Schema({
    creditosVentas: { type: String },
    bienesDeCambio: { type: String },
    deudasComerciales: { type: String },
    idUser: [{ type: mongoose.Schema.ObjectId, ref: "user" }],
})

const WorkingCapital = mongoose.model('workingCapital', workingCapitalSchema)

module.exports = WorkingCapital