const GastosPorCC = require("../models/GastosPorCC")
const User = require("../models/User")


const GastosPorCCController = {

  newGastosPorCC: async (req, res) => {
    const { centroDeCostos, idUser } = req.body;

    try {
      let newGastosPorCC = await GastosPorCC.findOneAndUpdate(
        { idUser },
        { centroDeCostos },
        { new: true, upsert: true }
      );

      // Update gastosGeneralData property in user model
      let user = await User.findByIdAndUpdate(
        idUser,
        { $addToSet: { gastosPorCCData: newGastosPorCC } },
        { new: true }
      );

      return res.status(200).json({ success: true, data: newGastosPorCC });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, error: 'Server Error' });
    }
  },


  eachGastosPorCC: (req, res) => {
    const { id } = req.params
    GastosPorCC.find({ idUser: id })
      .then(data => res.json({ success: true, response: data }))
      .catch(error => res.json({ succes: false, error }))
  },

}

module.exports = GastosPorCCController