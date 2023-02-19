const mongoose = require('mongoose')

const volumenSchema = new mongoose.Schema({

    volumen: [{
        country: { type: String },
        canal: { type: String },
        year: { type: String },
        product: [{
            id: { type: String },
            nameProduct: { type: String },
            months: { type: Array }

        }]
    }],
    businessData: [{ type: mongoose.Schema.ObjectId, ref: "user" }],


})

const Volumen = mongoose.model('volumen', volumenSchema)

module.exports = Volumen