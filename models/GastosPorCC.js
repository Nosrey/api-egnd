const mongoose = require('mongoose')

const GastosPorCCSchema = new mongoose.Schema({

    centroDeCostos: {type:Array},
    idUser: [{ type: mongoose.Schema.ObjectId, ref: "user" }],


})

const  GastosPorCC = mongoose.model('gastosPorCC', GastosPorCCSchema)

module.exports = GastosPorCC