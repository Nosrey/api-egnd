const Costo = require("../models/Costo")
const User = require("../models/User")


const costoController = {

    newCosto: async (req, res) => {
        const { countryName, stats, idUser } = req.body;

        try {
            let costo = await Costo.findOneAndUpdate(
                { idUser, countryName }, // Buscar el precio existente con el mismo idUser y countryName
                { stats },
                { new: true, upsert: true }
            );

            let user = await User.findByIdAndUpdate(
                idUser,
                { $addToSet: { costoData: costo } }, // Agregar el objeto "precio" al arreglo "precioData" del modelo de usuario sin duplicados
                { new: true }
            );

            return res.status(200).json({ success: true, data: costo });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ success: false, error: 'Server Error' });
        }
    },

    deleteCosto: async (req, res) => {
        const { countryName, idUser } = req.body;

        try {
            await Costo.deleteMany({ countryName, idUser });

            // Obtener el usuario correspondiente
            const user = await User.findOne({ _id: idUser });

            // Filtrar el array precioData eliminando el objeto correspondiente
            user.costoData = user.costoData.filter((costo) => {
                return costo.countryName !== countryName;
            });

            // Guardar los cambios en el usuario
            await user.save();

            res.status(200).json({ success: true, message: 'Registros eliminados correctamente.' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, error: 'Error al eliminar los registros.' });
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