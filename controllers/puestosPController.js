const PuestosP = require("../models/PuestosP")
const User = require("../models/User")


const PuestosPController = {

  newPuestosP: async (req, res) => {
    const { puestosp, idUser } = req.body;

    try {
      let newPuestosP = await PuestosP.findOneAndUpdate(
        { idUser },
        { puestosp },
        { new: true, upsert: true }
      );

      // Update gastosGeneralData property in user model
      let user = await User.findByIdAndUpdate(
        idUser,
        { $addToSet: { puestosPData: newPuestosP } },
        { new: true }
      );

      return res.status(200).json({ success: true, data: newPuestosP });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, error: 'Server Error' });
    }
  },


  eachPuestosP: (req, res) => {
    const { id } = req.params
    PuestosP.find({ idUser: id })
      .then(data => res.json({ success: true, response: data }))
      .catch(error => res.json({ succes: false, error }))
  },

}

module.exports = PuestosPController