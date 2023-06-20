const Mercado = require("../models/Mercado")
const User = require("../models/User")


const mercadoController = {

    newMercado: async (req, res) => {
        try {
            const mercadoExists = await Gastos.findOne({ idUser: req.body.idUser });
            if (mercadoExists) {
                if (req.body.mercado && req.body.mercado.trim().length !== 0) {
                    mercadoExists.mercado = req.body.mercado;
                }
                if (req.body.definicion && req.body.definicion.trim().length !== 0) {
                    mercadoExists.definicion = req.body.definicion;
                }
                if (req.body.valorTam && req.body.valorTam.trim().length !== 0) {
                    mercadoExists.valorTam = req.body.valorTam;
                }
                if (req.body.tam && req.body.tam.trim().length !== 0) {
                    mercadoExists.tam = req.body.tam;
                }
                if (req.body.valorSam && req.body.valorSam.trim().length !== 0) {
                    mercadoExists.valorSam = req.body.valorSam;
                }
                if (req.body.sam && req.body.sam.trim().length !== 0) {
                    mercadoExists.sam = req.body.sam;
                }
                if (req.body.valorSom && req.body.valorSom.trim().length !== 0) {
                    mercadoExists.valorSom = req.body.valorSom;
                }
                if (req.body.som && req.body.som.trim().length !== 0) {
                    mercadoExists.som = req.body.som;
                }
                var id = mercadoExists._id
                await User.findOneAndUpdate({ _id: req.body.idUser }, { $set: { mercadoData: id } }, { new: true })

                await mercadoExists.save();
                return res.status(200).send({ message: 'Mercado updated successfully' });
            } else {
                const newMercado = new Mercado({
                    mercado: req.body.mercado,
                    definicion: req.body.definicion,
                    valorTam: req.body.valorTam,
                    tam: req.body.tam,
                    valorSam: req.body.valorSam,
                    sam: req.body.sam,
                    valorSom: req.body.valorSom,
                    som: req.body.som,
                    idUser: req.body.idUser
                });

                var id = newMercado._id
                await User.findOneAndUpdate({ _id: req.body.idUser }, { $set: { mercadoData: id } }, { new: true })
                await newMercado.save();
                return res.status(200).send({ message: 'Mercado created successfully' });
            }
        } catch (error) {
            return res.status(500).send({ error: error.message });
        }

    },

    eachMercado: (req, res) => {
        const { id } = req.params
        Mercado.find({ idUser: id })
            .then(data => res.json({ success: true, response: data }))
            .catch(error => res.json({ succes: false, error }))
    },

}

module.exports = mercadoController