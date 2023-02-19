const PuestosQ = require("../models/PuestosQ")
const User = require("../models/User")


const puestosQController = {

    newPuestosQ: async (req, res) => {
        try {
            const puestosQExists = await PuestosQ.findOne({ idUser: req.body.idUser });
            if (puestosQExists) {
                if (req.body.puestosq && req.body.puestosq.trim().length !== 0) {
                    puestosQExists.puestosq = req.body.puestosq;
                }
                var id = puestosQExists._id
                await User.findOneAndUpdate({ _id: req.body.idUser }, { $set: { puestosQData: id } }, { new: true })

                await puestosQExists.save();
                return res.status(200).send({ message: 'PuestosQ updated successfully' });
            } else {
                const newPuestosQ = new PuestosQ({
                    puestosq: req.body.puestosq,
                    idUser: req.body.idUser
                });

                var id = newPuestosQ._id
                await User.findOneAndUpdate({ _id: req.body.idUser }, { $set: { puestosQData: id } }, { new: true })
                await newPuestosQ.save();
                return res.status(200).send({ message: 'PuestosQ created successfully' });
            }
        } catch (error) {
            return res.status(500).send({ error: error.message });
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