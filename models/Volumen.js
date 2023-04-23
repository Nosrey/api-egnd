const mongoose = require('mongoose')

const volumenSchema = new mongoose.Schema({

    countryName: { type: String },
    stats: {type: Array},
    idUser: [{ type: mongoose.Schema.ObjectId, ref: "user" }],


})

const Volumen = mongoose.model('volumen', volumenSchema)

module.exports = Volumen