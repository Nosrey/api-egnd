const Prestamos = require("../models/Prestamos")
const User = require("../models/User")


const prestamosController = {

    newPrestamos: async (req, res) => {

        try {
            const newPrestamos = new Prestamos({
                titulo: req.body.titulo,
                mesInicio: req.body.mesInicio,
                monto: req.body.monto,
                plazo: req.body.plazo,
                tasaAnual: req.body.tasaAnual,
                yearInicio: req.body.yearInicio,
                idUser: req.body.idUser
            });
            var id = newPrestamos._id
            await User.findOneAndUpdate({ _id: req.body.idUser }, { $push: { prestamos: id } }, { new: true })
            await newPrestamos.save();
            return res.status(200).send({ message: 'Prestamo created successfully' });

        } catch (error) {
            return res.status(500).send({ error: error.message });
        }
    },

    editPrestamos: async (req, res) => {
        try {
            const prestamoId = req.params.id; // Obtén el ID del préstamo desde los parámetros de la solicitud

            // Verifica si el préstamo con el ID dado existe
            const prestamoExistente = await Prestamos.findById(prestamoId);
            if (!prestamoExistente) {
                return res.status(404).send({ message: 'Prestamo not found' });
            }

            // Actualiza los campos del préstamo según los datos proporcionados en la solicitud
            await Prestamos.findByIdAndUpdate(prestamoId, {
                titulo: req.body.titulo || prestamoExistente.titulo,
                mesInicio: req.body.mesInicio || prestamoExistente.mesInicio,
                monto: req.body.monto || prestamoExistente.monto,
                plazo: req.body.plazo || prestamoExistente.plazo,
                tasaAnual: req.body.tasaAnual || prestamoExistente.tasaAnual,
                yearInicio: req.body.yearInicio || prestamoExistente.yearInicio
                // Otros campos que puedan ser editados
            }, { new: true });

            return res.status(200).send({ message: 'Prestamo updated successfully' });
        } catch (error) {
            return res.status(500).send({ error: error.message });
        }
    },
    deletePrestamos: async (req, res) => {
        try {
            const prestamoId = req.params.id; // Obtén el ID del préstamo desde los parámetros de la solicitud

            // Verifica si el préstamo con el ID dado existe
            const prestamoExistente = await Prestamos.findById(prestamoId);
            if (!prestamoExistente) {
                return res.status(404).send({ message: 'Prestamo not found' });
            }

            // Elimina el préstamo de la colección de préstamos
            await Prestamos.findByIdAndRemove(prestamoId);

            // Elimina la referencia del préstamo en la colección de usuarios
            await User.findByIdAndUpdate(prestamoExistente.idUser, { $pull: { prestamos: prestamoId } });

            return res.status(200).send({ message: 'Prestamo deleted successfully' });
        } catch (error) {
            return res.status(500).send({ error: error.message });
        }
    },


}

module.exports = prestamosController