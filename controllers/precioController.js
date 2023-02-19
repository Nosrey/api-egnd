const Precio = require("../models/Precio")
const User = require("../models/User")


const precioController = {

    newPrecio: async (req, res) => {
        try {
            const precioExists = await Precio.findOne({ idUser: req.body.idUser });
            if (precioExists) {
                if (req.body.precio && req.body.precio.trim().length !== 0) {
                    precioExists.precio = req.body.precio;
                }
                var id = precioExists._id
                await User.findOneAndUpdate({ _id: req.body.idUser }, { $set: { precioData: id } }, { new: true })

                await precioExists.save();
                return res.status(200).send({ message: 'Precio updated successfully' });
            } else {
                const newPrecio = new Precio({
                    precio: req.body.precio,
                    idUser: req.body.idUser
                });

                var id = newPrecio._id
                await User.findOneAndUpdate({ _id: req.body.idUser }, { $set: { precioData: id } }, { new: true })
                await newPrecio.save();
                return res.status(200).send({ message: 'Precio created successfully' });
            }
        } catch (error) {
            return res.status(500).send({ error: error.message });
        }

    },

    eachPrecio: (req, res) => {
        const { id } = req.params
        Precio.find({ idUser: id })
            .then(data => res.json({ success: true, response: data }))
            .catch(error => res.json({ succes: false, error }))
    },

}

module.exports = precioController