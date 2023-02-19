const mongoose = require('mongoose')

const puestosQSchema = new mongoose.Schema({

    puestosq: [{
        rubro: { type: String },
        year: { type: String },
        puesto: [{
            name: { type: String },
            months: { type: Array }
        }]
    }],
    idUser: [{ type: mongoose.Schema.ObjectId, ref: "user" }],


})

const PuestosQ = mongoose.model('puestosQ', puestosQSchema)

module.exports = PuestosQ