const Balance = require("../models/Balance");
const User = require("../models/User");

const balanceController = {
    newBalance: async (req, res) => {
        try {
            const balanceExists = await Balance.findOne({ idUser: req.body.idUser });

            if (balanceExists) {
                // Actualiza el registro existente con los datos proporcionados
                Object.assign(balanceExists, req.body);

                // Guarda los cambios
                await balanceExists.save();

                return res.status(200).send({ message: 'Balance updated successfully' });
            } else {
                // Crea un nuevo registro de Balance con los datos proporcionados
                const newBalance = new Balance(req.body);

                // Guarda el nuevo registro de Balance
                await newBalance.save();

                // Actualiza el campo BalanceData del usuario en la colección de usuarios con la referencia al nuevo registro de Balance
                const id = newBalance._id;
                await User.findOneAndUpdate({ _id: req.body.idUser }, { $set: { balanceData: id } }, { new: true });

                return res.status(200).send({ message: 'Balance created successfully' });
            }
        } catch (error) {
            return res.status(500).send({ error: error.message });
        }
    },

    eachBalance: (req, res) => {
        const { id } = req.params;

        // Obtiene todos los registros de Balance asociados a un usuario específico
        Balance.find({ idUser: id })
            .then(data => res.json({ success: true, response: data }))
            .catch(error => res.json({ success: false, error }));
    },
};

module.exports = balanceController;
