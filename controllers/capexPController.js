const CapexP = require("../models/CapexP")
const User = require("../models/User")


const CapexPController = {

  newCapexP: async (req, res) => {
    const { capexP, idUser } = req.body;

    try {
      let newCapexP = await CapexP.findOneAndUpdate(
        { idUser },
        { capexP },
        { new: true, upsert: true }
      );

      // Update gastosGeneralData property in user model
      let user = await User.findByIdAndUpdate(
        idUser,
        { $addToSet: { capexPData: newCapexP } },
        { new: true }
      );

      return res.status(200).json({ success: true, data: newCapexP });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, error: 'Server Error' });
    }
  },


  eachCapexP: (req, res) => {
    const { id } = req.params
    CapexP.find({ idUser: id })
      .then(data => res.json({ success: true, response: data }))
      .catch(error => res.json({ succes: false, error }))
  },

}

module.exports = CapexPController