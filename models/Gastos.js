const mongoose = require('mongoose')

const gastosSchema = new mongoose.Schema({

    gastos: [{
        rubro: { type: String },
        year: { type: String },
        num: { type: String },
        numAcc: { type: String },
        contableAcc: { type: String },
        puesto: [{
            name: { type: String },
            months: { type: Array }
        }]
    }],
    idUser: [{ type: mongoose.Schema.ObjectId, ref: "user" }],


})

const Gastos = mongoose.model('gastos', gastosSchema)

module.exports = Gastos