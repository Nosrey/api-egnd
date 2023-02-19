const mongoose = require('mongoose')

const costoSchema = new mongoose.Schema({

    costo: [{
        pais: { type: String },
        canal: { type: String },
        year: { type: String },
        producto: [{
            id: { type: String },
            product: { type: String },
            months: { type: Array }

        }],
        extra: [{
            name: { type: String },
            percentage: { type: String },
            months: { type: Array }

        }]
    }],
    idUser: [{ type: mongoose.Schema.ObjectId, ref: "user" }],

})

const Costo = mongoose.model('costo', costoSchema)

module.exports = Costo