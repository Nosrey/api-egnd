const Precio = require("../models/Precio")
const User = require("../models/User")


const precioController = {



  newPrecio: async (req, res) => {
    const { countryName, stats, idUser } = req.body;

    try {
      let precio = await Precio.findOne({ countryName, idUser });

      if (precio) {
        // If a document with the same countryName and idUser already exists, update it
        precio.stats = stats;
        await precio.save();
      } else {
        // Otherwise, create a new document
        precio = new Precio({ countryName, stats, idUser });
        await precio.save();
      }

      // Update precioData property in user model
      let user = await User.findByIdAndUpdate(
        idUser,
        { $addToSet: { precioData: precio } },
        { new: true }
      ).populate('precioData');

      // Sort precioData array alphabetically by countryName
      user.precioData.sort((a, b) => a.countryName.localeCompare(b.countryName));

      return res.status(200).json({ success: true, data: precio });
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