const Gastos = require("../models/Gastos")
const User = require("../models/User")


const gastoController = {

    newGasto: async (req, res) => {
        try {
            const gastoExists = await Gastos.findOne({ idUser: req.body.idUser });
            if (gastoExists) {
                if (req.body.gastos && req.body.gastos.trim().length !== 0) {
                    gastoExists.gastos = req.body.gastos;
                }
                var id = gastoExists._id
                await User.findOneAndUpdate({ _id: req.body.idUser }, { $set: { gastosData: id } }, { new: true })

                await gastoExists.save();
                return res.status(200).send({ message: 'Costo updated successfully' });
            } else {
                const newGastos = new Gastos({
                    gastos: req.body.gastos,
                    idUser: req.body.idUser
                });

                var id = newGastos._id
                await User.findOneAndUpdate({ _id: req.body.idUser }, { $set: { gastosData: id } }, { new: true })
                await newGastos.save();
                return res.status(200).send({ message: 'Costo created successfully' });
            }
        } catch (error) {
            return res.status(500).send({ error: error.message });
        }

    },

    eachGasto: (req, res) => {
        const { id } = req.params
        Gastos.find({ idUser: id })
            .then(data => res.json({ success: true, response: data }))
            .catch(error => res.json({ succes: false, error }))
    },

}

module.exports = gastoController