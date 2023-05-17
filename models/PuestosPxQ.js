const mongoose = require('mongoose')

const puestosPxQSchema = new mongoose.Schema({

    puestosPxQ: {type:Array},
    idUser: [{ type: mongoose.Schema.ObjectId, ref: "user" }],


})

const PuestosPxQ = mongoose.model('puestosPxQ', puestosPxQSchema)

module.exports = PuestosPxQ