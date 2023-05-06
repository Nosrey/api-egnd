const GastosGeneral = require("../models/GastosGeneral")
const User = require("../models/User")


const gastosController = {



    newGastosGeneral: async (req, res) => {
        const { centroDeGastos, cargasSociales, idUser } = req.body;
      
        try {
          let gastosGeneral = await GastosGeneral.findOneAndUpdate(
            { idUser },
            { centroDeGastos, cargasSociales },
            { new: true, upsert: true }
          );
      
          // Update gastosGeneralData property in user model
          let user = await User.findByIdAndUpdate(
            idUser,
            { $addToSet: { gastosGeneralData: gastosGeneral } },
            { new: true }
          );
      
          return res.status(200).json({ success: true, data: gastosGeneral });
        } catch (err) {
          console.error(err);
          return res.status(500).json({ success: false, error: 'Server Error' });
        }
      },
      
      
    
    
    
    eachGastosGeneral: (req, res) => {
        const { id } = req.params
        GastosGeneral.find({ idUser: id })
            .then(data => res.json({ success: true, response: data }))
            .catch(error => res.json({ succes: false, error }))
    },


}

module.exports = gastosController