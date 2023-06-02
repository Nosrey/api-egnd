const CapexQ = require("../models/CapexQ")
const User = require("../models/User")


const CapexQController = {

  newCapexQ: async (req, res) => {
    const { capexQ, idUser } = req.body;

    try {
      let newCapexQ = await CapexQ.findOneAndUpdate(
        { idUser },
        { capexQ },
        { new: true, upsert: true }
      );

      // Update gastosGeneralData property in user model
      let user = await User.findByIdAndUpdate(
        idUser,
        { $addToSet: { capexQData: newCapexQ } },
        { new: true }
      );

      return res.status(200).json({ success: true, data: newCapexQ });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, error: 'Server Error' });
    }
  },


  eachCapexQ: (req, res) => {
    const { id } = req.params
    CapexQ.find({ idUser: id })
      .then(data => res.json({ success: true, response: data }))
      .catch(error => res.json({ succes: false, error }))
  },

}

module.exports = CapexQController