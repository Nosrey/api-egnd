const mongoose = require('mongoose')

const PuestosPSchema = new mongoose.Schema({

    puestosP: {type:Array},
    idUser: [{ type: mongoose.Schema.ObjectId, ref: "user" }],


})

const  PuestosP = mongoose.model('puestosP', PuestosPSchema)

module.exports = PuestosP