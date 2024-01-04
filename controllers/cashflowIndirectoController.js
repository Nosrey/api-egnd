const CashflowIndirecto = require("../models/CashflowIndirecto");
const User = require("../models/User");

const cashflowIndirectoController = {
    newCashflowIndirecto: async (req, res) => {
        try {
            const cashflowIndirectoExists = await CashflowIndirecto.findOne({ idUser: req.body.idUser });

            if (cashflowIndirectoExists) {
                // Actualiza el registro existente con los datos proporcionados
                Object.assign(cashflowIndirectoExists, req.body);

                // Guarda los cambios
                await cashflowIndirectoExists.save();

                return res.status(200).send({ message: 'PL updated successfully' });
            } else {
                // Crea un nuevo registro de PL con los datos proporcionados
                const newCashflowIndirecto = new PL(req.body);

                // Guarda el nuevo registro de PL
                await newCashflowIndirecto.save();

                // Actualiza el campo plData del usuario en la colección de usuarios con la referencia al nuevo registro de PL
                const id = newCashflowIndirecto._id;
                await User.findOneAndUpdate({ _id: req.body.idUser }, { $set: { cashflowIndirectoData: id } }, { new: true });

                return res.status(200).send({ message: 'cashflowIndirecto created successfully' });
            }
        } catch (error) {
            return res.status(500).send({ error: error.message });
        }
    },

    eachCashflowIndirecto: (req, res) => {
        const { id } = req.params;

        // Obtiene todos los registros de PL asociados a un usuario específico
        CashflowIndirecto.find({ idUser: id })
            .then(data => res.json({ success: true, response: data }))
            .catch(error => res.json({ success: false, error }));
    },
};

module.exports = cashflowIndirectoController;
