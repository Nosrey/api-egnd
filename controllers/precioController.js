const Precio = require("../models/Precio")
const User = require("../models/User")


const precioController = {

  newPrecio: async (req, res) => {
    const { countryName, stats, idUser } = req.body;

    try {
      let precio = await Precio.findOneAndUpdate(
        { idUser, countryName }, // Buscar el precio existente con el mismo idUser y countryName
        { stats },
        { new: true, upsert: true }
      );

      let user = await User.findByIdAndUpdate(
        idUser,
        { $addToSet: { precioData: precio } }, // Agregar el objeto "precio" al arreglo "precioData" del modelo de usuario sin duplicados
        { new: true }
      );

      return res.status(200).json({ success: true, data: precio });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, error: 'Server Error' });
    }
  },


  deletePrecio: async (req, res) => {
    const { countryName, idUser } = req.body;

    try {
      await Precio.deleteMany({ countryName, idUser });

      // Obtener el usuario correspondiente
      const user = await User.findOne({ _id: idUser });

      // Filtrar el array precioData eliminando el objeto correspondiente
      user.precioData = user.precioData.filter((precio) => {
        return precio.countryName !== countryName;
      });

      // Guardar los cambios en el usuario
      await user.save();

      res.status(200).json({ success: true, message: 'Registros eliminados correctamente.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Error al eliminar los registros.' });
    }
  },

  eachPrecio: (req, res) => {
    const { id } = req.params
    Precio.find({ idUser: id })
      .then(data => res.json({ success: true, response: data }))
      .catch(error => res.json({ succes: false, error }))
  },

  obtenerPrecio: async (req, res) => {
    const { id } = req.params;
    console.log(id)

    try {
      const precio = await Precio.findById(id);
      res.json(precio);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener el precio.' });
    }
  }

}

module.exports = precioController