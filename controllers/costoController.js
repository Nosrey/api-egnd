const Costo = require("../models/Costo")
const User = require("../models/User")


const costoController = {

    newCosto: async (req, res) => {
        try {
            const costoExists = await Costo.findOne({ idUser: req.body.idUser });
            if (costoExists) {
                if (req.body.costo && req.body.costo.trim().length !== 0) {
                    costoExists.costo = req.body.costo;
                }
                var id = costoExists._id
                await User.findOneAndUpdate({ _id: req.body.idUser }, { $set: { costoData: id } }, { new: true })

                await costoExists.save();
                return res.status(200).send({ message: 'Costo updated successfully' });
            } else {
                const newCosto = new Costo({
                    costo: req.body.costo,
                    idUser: req.body.idUser
                });

                var id = newCosto._id
                await User.findOneAndUpdate({ _id: req.body.idUser }, { $set: { costoData: id } }, { new: true })
                await newCosto.save();
                return res.status(200).send({ message: 'Costo created successfully' });
            }
        } catch (error) {
            return res.status(500).send({ error: error.message });
        }

    },

    eachCosto: (req, res) => {
        const { id } = req.params
        Costo.find({ idUser: id })
            .then(data => res.json({ success: true, response: data }))
            .catch(error => res.json({ succes: false, error }))
    },

}

module.exports = costoController