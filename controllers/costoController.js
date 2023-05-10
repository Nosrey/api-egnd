const Costo = require("../models/Costo")
const User = require("../models/User")


const costoController = {

    newCosto: async (req, res) => {
        const { countryName, stats, idUser, totalPriceMonth } = req.body;

        try {
            let costo = await Costo.findOne({ countryName, idUser });

            if (costo) {
                // If a document with the same countryName and idUser already exists, update it
                costo.stats = stats;
                await costo.save();
            } else {
                // Otherwise, create a new document
                costo = new Costo({ countryName, stats, idUser, totalPriceMonth});
                await costo.save();
            }

            // Update costoData property in user model
            let user = await User.findByIdAndUpdate(
                idUser,
                { $addToSet: { costoData: costo } },
                { new: true }
            );

            return res.status(200).json({ success: true, data: costo });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ success: false, error: 'Server Error' });
        }
    },

    eachCosto: (req, res) => {
        const { id } = req.params
        Costo.find({ idUser: id })
            .then(data => res.json({ success: true, response: data }))
            .catch(error => res.json({ succes: false, error }))
    },

}

module.exports = costoController