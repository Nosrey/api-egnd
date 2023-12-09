const PL = require("../models/Pl");
const User = require("../models/User");

const plController = {
    newPL: async (req, res) => {
        try {
            const plExists = await PL.findOne({ idUser: req.body.idUser });

            if (plExists) {
                // Actualiza el registro existente con los datos proporcionados
                Object.assign(plExists, req.body);

                // Guarda los cambios
                await plExists.save();

                return res.status(200).send({ message: 'PL updated successfully' });
            } else {
                // Crea un nuevo registro de PL con los datos proporcionados
                const newPL = new PL(req.body);

                // Guarda el nuevo registro de PL
                await newPL.save();

                // Actualiza el campo plData del usuario en la colección de usuarios con la referencia al nuevo registro de PL
                const id = newPL._id;
                await User.findOneAndUpdate({ _id: req.body.idUser }, { $set: { plData: id } }, { new: true });

                return res.status(200).send({ message: 'PL created successfully' });
            }
        } catch (error) {
            return res.status(500).send({ error: error.message });
        }
    },

    eachPL: (req, res) => {
        const { id } = req.params;

        // Obtiene todos los registros de PL asociados a un usuario específico
        PL.find({ idUser: id })
            .then(data => res.json({ success: true, response: data }))
            .catch(error => res.json({ success: false, error }));
    },
};

module.exports = plController;
