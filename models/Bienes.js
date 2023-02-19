const mongoose = require('mongoose')

const bienesSchema = new mongoose.Schema({

    bienes: [{
        year: { type: String },
        bien: [{
            name: { type: String },
            detail: { type: String },
            unidad: { type: String },
            price: { type: String },
            months: { type: Array }
        }],
        
    }],
    idUser: [{ type: mongoose.Schema.ObjectId, ref: "user" }],

})

const Bienes = mongoose.model('bienes', bienesSchema)

module.exports = Bienes