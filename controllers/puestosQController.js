const PuestosQ = require("../models/PuestosQ")
const User = require("../models/User")


const puestosQController = {

    newPuestosQ: async (req, res) => {
        const { puestosq, idUser } = req.body;
    
        try {
          let puestosQ = await PuestosQ.findOneAndUpdate(
            { idUser },
            { puestosq },
            { new: true, upsert: true }
          );
    
          // Update gastosGeneralData property in user model
          let user = await User.findByIdAndUpdate(
            idUser,
            { $addToSet: { puestosQData: puestosQ } },
            { new: true }
          );
    
          return res.status(200).json({ success: true, data: puestosQ });
        } catch (err) {
          console.error(err);
          return res.status(500).json({ success: false, error: 'Server Error' });
        }
      },
    

    eachPuestosQ: (req, res) => {
        const { id } = req.params
        PuestosQ.find({ idUser: id })
            .then(data => res.json({ success: true, response: data }))
            .catch(error => res.json({ succes: false, error }))
    },

}

module.exports = puestosQController