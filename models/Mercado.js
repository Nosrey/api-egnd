const mongoose = require('mongoose')

const mercadoSchema = new mongoose.Schema({
    mercado: { type: String },
    definicion: { type: String },
    valorTam: { type: String },
    tam: { type: String },
    valorSam: { type: String },
    sam: { type: String },
    valorSom: { type: String },
    som: { type: String },
    idUser: [{ type: mongoose.Schema.ObjectId, ref: "user" }],
})

const Mercado = mongoose.model('mercado', mercadoSchema)

module.exports = Mercado