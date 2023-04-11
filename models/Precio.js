const mongoose = require('mongoose')

const precioSchema = new mongoose.Schema({
    countryName: { type: String },
    stats: {type: Array},
    idUser: [{ type: mongoose.Schema.ObjectId, ref: "user" }],


})

const Precio = mongoose.model('precio', precioSchema)

module.exports = Precio