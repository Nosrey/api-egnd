const Volumen = require("../models/Volumen")
const User = require("../models/User")


const volumenController = {

    newVolumen: async (req, res) => {
        const { countryName, stats, idUser } = req.body;

        try {
            let volumen = await Volumen.findOneAndUpdate(
                { idUser },
                { countryName, stats },
                { new: true, upsert: true }
            );

            // Update gastosGeneralData property in user model
            let user = await User.findByIdAndUpdate(
                idUser,
                { $addToSet: { volumenData: volumen } },
                { new: true }
            );

            return res.status(200).json({ success: true, data: volumen });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ success: false, error: 'Server Error' });
        }
    },

    deleteVolumen: async (req, res) => {
        const { countryName, idUser } = req.body;

        try {
            await Volumen.deleteMany({ countryName, idUser });

            // Obtener el usuario correspondiente
            const user = await User.findOne({ _id: idUser });

            // Filtrar el array precioData eliminando el objeto correspondiente
            user.volumenData = user.volumenData.filter((volumen) => {
                return volumen.countryName !== countryName;
            });

            // Guardar los cambios en el usuario
            await user.save();

            res.status(200).json({ success: true, message: 'Registros eliminados correctamente.' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, error: 'Error al eliminar los registros.' });
        }
    },

    eachVolumen: (req, res) => {
        const { id } = req.params
        Volumen.find({ idUser: id })
            .then(data => res.json({ success: true, response: data }))
            .catch(error => res.json({ succes: false, error }))
    },

}

module.exports = volumenController