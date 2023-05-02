const Precio = require("../models/Precio")
const User = require("../models/User")


const precioController = {



  newPrecio: async (req, res) => {
    const { precios, idUser } = req.body;
  
    try {
      // Sort precios array alphabetically by countryName
      precios.sort((a, b) => a.countryName.localeCompare(b.countryName));
  
      // Update or create new Precio documents for each object in the precios array
      const updatedPrecios = await Promise.all(
        precios.map(async (precio) => {
          const { countryName, stats } = precio;
          let updatedPrecio = await Precio.findOne({ countryName, idUser });
          if (updatedPrecio) {
            updatedPrecio.stats = stats;
          } else {
            updatedPrecio = new Precio({ countryName, stats, idUser });
          }
          return updatedPrecio.save();
        })
      );
  
      // Update precioData property in user model
      let user = await User.findByIdAndUpdate(
        idUser,
        { $set: { precioData: updatedPrecios } },
        { new: true }
      ).populate('precioData');
  
      return res.status(200).json({ success: true, data: updatedPrecios });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, error: 'Server Error' });
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