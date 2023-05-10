const mongoose = require('mongoose')

const puestosQSchema = new mongoose.Schema({

    puestosq: {type:Array},
    idUser: [{ type: mongoose.Schema.ObjectId, ref: "user" }],


})

const PuestosQ = mongoose.model('puestosQ', puestosQSchema)

module.exports = PuestosQ