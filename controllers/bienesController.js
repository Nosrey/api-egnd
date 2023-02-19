const Bienes = require("../models/Bienes")
const User = require("../models/User")


const bienesController = {

    newBienes: async (req, res) => {
        try {
            const bienesExists = await Bienes.findOne({ idUser: req.body.idUser });
            if (bienesExists) {
                if (req.body.bienes && req.body.bienes.trim().length !== 0) {
                    bienesExists.bienes = req.body.bienes;
                }
                var id = bienesExists._id
                await User.findOneAndUpdate({_id: req.body.idUser},{ $set: { bienesData: id } }, { new: true })
               
                await bienesExists.save();
                return res.status(200).send({ message: 'Bienes updated successfully' });
            } else {
                const newBienes = new Bienes({
                    bienes: req.body.bienes,
                    idUser: req.body.idUser
                });

                var id = newBienes._id
                await User.findOneAndUpdate({_id: req.body.idUser},{ $set: { bienesData: id } }, { new: true })
                await newBienes.save();
                return res.status(200).send({ message: 'Bienes created successfully' });
            }
        } catch (error) {
            return res.status(500).send({ error: error.message });
        }

    },

    eachBienes: (req, res) => {
        const { id } = req.params
        Bienes.find({ idUser: id })
            .then(data => res.json({ success: true, response: data }))
            .catch(error => res.json({ succes: false, error }))
    },

}

module.exports = bienesController