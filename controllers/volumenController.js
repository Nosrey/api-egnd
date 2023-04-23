const Volumen = require("../models/Volumen")
const User = require("../models/User")


const volumenController = {

    newVolumen: async (req, res) => {
        const { countryName, stats, idUser } = req.body;

        try {
            let volumen = await Volumen.findOne({ countryName, idUser });

            if (volumen) {
                // If a document with the same countryName and idUser already exists, update it
                volumen.stats = stats;
                await volumen.save();
            } else {
                // Otherwise, create a new document
                volumen = new Volumen({ countryName, stats, idUser });
                await volumen.save();
            }

            // Update volumenData property in user model
            let user = await User.findByIdAndUpdate(
                idUser,
                { $addToSet: { volumenData: volumen } },
                { new: true }
            );

            return res.status(200).json({ success: true, data: volumen });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ success: false, error: 'Server Error' });
        }
    },


    eachVolumen: (req, res) => {
        const { id } = req.params
        Volumen.find({ idUser: id })
            .then(data => res.json({ success: true, response: data }))
            .catch(error => res.json({ succes: false, error }))
    },

}

module.exports = volumenController