const Volumen = require("../models/Volumen")
const User = require("../models/User")


const volumenController = {

    newVolumen: async (req, res) => {
        try {
            const volumenExists = await Volumen.findOne({ idUser: req.body.idUser });
            if (volumenExists) {
                if (req.body.volumen && req.body.volumen.trim().length !== 0) {
                    volumenExists.volumen = req.body.volumen;
                }
                var id = volumenExists._id
                await User.findOneAndUpdate({ _id: req.body.idUser }, { $set: { volumenData: id } }, { new: true })

                await volumenExists.save();
                return res.status(200).send({ message: 'PuestosQ updated successfully' });
            } else {
                const newVolumen = new Volumen({
                    volumen: req.body.volumen,
                    idUser: req.body.idUser
                });

                var id = newVolumen._id
                await User.findOneAndUpdate({ _id: req.body.idUser }, { $set: { volumenData: id } }, { new: true })
                await newVolumen.save();
                return res.status(200).send({ message: 'PuestosQ created successfully' });
            }
        } catch (error) {
            return res.status(500).send({ error: error.message });
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