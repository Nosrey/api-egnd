const mongoose = require('mongoose')

const precioSchema = new mongoose.Schema({

    precio: [{
        pais: { type: String },
        canal: { type: String },
        year: { type: String },
        producto: [{
            id: { type: String },
            product: { type: String },
            months: { type: Array }

        }]
    }],
    idUser: [{ type: mongoose.Schema.ObjectId, ref: "user" }],


})

const Precio = mongoose.model('precio', precioSchema)

module.exports = Precio