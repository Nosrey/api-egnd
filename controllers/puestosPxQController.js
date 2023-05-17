const PuestosPxQ = require("../models/PuestosPxQ")
const User = require("../models/User")


const puestosPxQController = {

  newPuestosPxQ: async (req, res) => {
    const { puestosPxQ, idUser } = req.body;

    try {
      let newPuestosPxQ = await PuestosPxQ.findOneAndUpdate(
        { idUser },
        { puestosPxQ },
        { new: true, upsert: true }
      );

      // Update gastosGeneralData property in user model
      let user = await User.findByIdAndUpdate(
        idUser,
        { $addToSet: { puestosPxQData: newPuestosPxQ } },
        { new: true }
      );

      return res.status(200).json({ success: true, data: newPuestosPxQ });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, error: 'Server Error' });
    }
  },


  eachPuestosPxQ: (req, res) => {
    const { id } = req.params
    PuestosPxQ.find({ idUser: id })
      .then(data => res.json({ success: true, response: data }))
      .catch(error => res.json({ succes: false, error }))
  },

}

module.exports = puestosPxQController