const mongoose = require('mongoose')

const CapexPSchema = new mongoose.Schema({

    capexP: {type:Array},
    idUser: [{ type: mongoose.Schema.ObjectId, ref: "user" }],


})

const  CapexP = mongoose.model('capexP', CapexPSchema)

module.exports = CapexP