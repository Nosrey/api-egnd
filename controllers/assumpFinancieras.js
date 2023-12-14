const assumpFinancieras = require("../models/AssumpFinancieras");
const AssumpFinancieras = require("../models/AssumpFinancieras")
const User = require("../models/User")


const assumpFinancierasController = {

    newAssumpFinancieras: async (req, res) => {
        try {
            // Buscar si ya existe un registro para el usuario
            const assumpFinancierasExists = await AssumpFinancieras.findOne({ idUser: req.body.idUser });

            if (assumpFinancierasExists) {
                // Actualizar el registro existente con los nuevos datos proporcionados
                Object.assign(assumpFinancierasExists, req.body);
                await assumpFinancierasExists.save();
                return res.status(200).send({ message: 'Assumption Financieras updated successfully' });
            } else {
                // Crear un nuevo registro
                const newAssumpFinancieras = new AssumpFinancieras(req.body);
                await newAssumpFinancieras.save();

                // Actualizar el campo 'assumpFinancierasData' en el documento de usuario
                const id = newAssumpFinancieras._id;
                await User.findOneAndUpdate(
                    { _id: req.body.idUser },
                    { $set: { assumpFinancierasData: id } },
                    { new: true }
                );

                return res.status(200).send({ message: 'Assumption Financieras created successfully' });
            }
        } catch (error) {
            return res.status(500).send({ error: error.message });
        }
    },

    eachBienes: (req, res) => {
        const { id } = req.params
        AssumpFinancieras.find({ idUser: id })
            .then(data => res.json({ success: true, response: data }))
            .catch(error => res.json({ succes: false, error }))
    },

}

module.exports = assumpFinancierasController