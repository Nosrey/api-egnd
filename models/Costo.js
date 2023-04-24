const mongoose = require('mongoose')

const costoSchema = new mongoose.Schema({

    countryName: { type: String },
    stats: {type: Array},
    idUser: [{ type: mongoose.Schema.ObjectId, ref: "user" }],

})

const Costo = mongoose.model('costo', costoSchema)

module.exports = Costo