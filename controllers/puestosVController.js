const PuestosV = require("../models/PuestosV")
const User = require("../models/User")


const puestosVController = {

    newPuestosV: async (req, res) => {
        try {
            const puestosVExists = await PuestosV.findOne({ idUser: req.body.idUser });
            if (puestosVExists) {
                if (req.body.puestosv && req.body.puestosv.trim().length !== 0) {
                    puestosVExists.puestosv = req.body.puestosv;
                }
                var id = puestosVExists._id
                await User.findOneAndUpdate({ _id: req.body.idUser }, { $set: { puestosVData: id } }, { new: true })

                await puestosVExists.save();
                return res.status(200).send({ message: 'PuestosV updated successfully' });
            } else {
                const newPuestosV = new PuestosV({
                    puestosv: req.body.puestosv,
                    idUser: req.body.idUser
                });

                var id = newPuestosV._id
                await User.findOneAndUpdate({ _id: req.body.idUser }, { $set: { puestosVData: id } }, { new: true })
                await newPuestosV.save();
                return res.status(200).send({ message: 'PuestosV created successfully' });
            }
        } catch (error) {
            return res.status(500).send({ error: error.message });
        }

    },

    eachPuestosV: (req, res) => {
        const { id } = req.params
        PuestosV.find({ idUser: id })
            .then(data => res.json({ success: true, response: data }))
            .catch(error => res.json({ succes: false, error }))
    },

}

module.exports = puestosVController