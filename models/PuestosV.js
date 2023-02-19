const mongoose = require('mongoose')

const puestosVSchema = new mongoose.Schema({

    puestosv: [{
        rubro: { type: String },
        year: { type: String },
        puesto: [{
            name: { type: String },
            months: { type: Array }
        }]
    }],
    idUser: [{ type: mongoose.Schema.ObjectId, ref: "user" }],


})

const PuestosV = mongoose.model('puestosV', puestosVSchema)

module.exports = PuestosV