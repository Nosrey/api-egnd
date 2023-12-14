const WorkingCapital = require("../models/WorkingCapital");
const User = require("../models/User");

const workingCapitalController = {
    newWorkingCapital: async (req, res) => {
        try {
            const workingCapitalExists = await WorkingCapital.findOne({ idUser: req.body.idUser });

            if (workingCapitalExists) {
                // Actualiza el registro existente con los datos proporcionados
                Object.assign(workingCapitalExists, req.body);

                // Guarda los cambios
                await workingCapitalExists.save();

                return res.status(200).send({ message: 'WorkingCapital updated successfully' });
            } else {
                // Crea un nuevo registro de WorkingCapital con los datos proporcionados
                const newWorkingCapital = new WorkingCapital(req.body);

                // Guarda el nuevo registro de WorkingCapital
                await newWorkingCapital.save();

                // Actualiza el campo WorkingCapitalData del usuario en la colección de usuarios con la referencia al nuevo registro de WorkingCapital
                const id = newWorkingCapital._id;
                await User.findOneAndUpdate({ _id: req.body.idUser }, { $set: { workingCapitalData: id } }, { new: true });

                return res.status(200).send({ message: 'WorkingCapital created successfully' });
            }
        } catch (error) {
            return res.status(500).send({ error: error.message });
        }
    },

    eachWorkingCapital: (req, res) => {
        const { id } = req.params;

        // Obtiene todos los registros de WorkingCapital asociados a un usuario específico
        WorkingCapital.find({ idUser: id })
            .then(data => res.json({ success: true, response: data }))
            .catch(error => res.json({ success: false, error }));
    },
};

module.exports = workingCapitalController;
