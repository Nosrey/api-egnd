const mongoose = require('mongoose')

const PrestamosSchema = new mongoose.Schema({

    titulo: { type: String },
    mesInicio: { type: String },
    monto: { type: String },
    plazo: { type: String },
    tasaAnual: { type: String },
    yearInicio: { type: String },
    idUser: [{ type: mongoose.Schema.ObjectId, ref: "user" }],

})

const Prestamos = mongoose.model('prestamos', PrestamosSchema)

module.exports = Prestamos