const mongoose = require('mongoose')

const CapexQSchema = new mongoose.Schema({

    capexQ: {type:Array},
    idUser: [{ type: mongoose.Schema.ObjectId, ref: "user" }],


})

const  CapexQ = mongoose.model('capexQ', CapexQSchema)

module.exports = CapexQ