const assumpFinancieras = require("../models/AssumpFinancieras");
const AssumpFinancieras = require("../models/AssumpFinancieras")
const User = require("../models/User")


const assumpFinancierasController = {

    newAssumpFinancieras: async (req, res) => {
        try {
            const assumpFinancierasExists = await AssumpFinancieras.findOne({ idUser: req.body.idUser });
            if (assumpFinancierasExists) {
                if (req.body.cobranzas && req.body.cobranzas.trim().length !== 0) {
                    assumpFinancierasExists.cobranzas = req.body.cobranzas;
                }
                if (req.body.pagoProducto && req.body.pagoProducto.trim().length !== 0) {
                    assumpFinancierasExists.pagoProducto = req.body.pagoProducto;
                }
                if (req.body.pagoServicio && req.body.pagoServicio.trim().length !== 0) {
                    assumpFinancierasExists.pagoServicio = req.body.pagoServicio;
                }
                if (req.body.stock && req.body.stock.trim().length !== 0) {
                    assumpFinancierasExists.stock = req.body.stock;
                }
                if (req.body.inversion && req.body.inversion.trim().length !== 0) {
                    assumpFinancierasExists.inversion = req.body.inversion;
                }
                if (req.body.impGanancias && req.body.impGanancias.trim().length !== 0) {
                    assumpFinancierasExists.impGanancias = req.body.impGanancias;
                }

                var id = assumpFinancierasExists._id
                await User.findOneAndUpdate({ _id: req.body.idUser }, { $set: { assumpFinancierasData: id } }, { new: true })
                await assumpFinancierasExists.save();
                return res.status(200).send({ message: 'Assumption Financieras updated successfully' });
            } else {
                const newAssumpFinnacieras = new AssumpFinancieras({
                    cobranzas: req.body.cobranzas,
                    pagoProducto: req.body.pagoProducto,
                    pagoServicio: req.body.pagoServicio,
                    stock: req.body.stock,
                    inversion: req.body.inversion,
                    impGanancias: req.body.impGanancias,
                    idUser: req.body.idUser
                });

                var id = newAssumpFinnacieras._id
                await User.findOneAndUpdate({ _id: req.body.idUser }, { $set: { assumpFinancierasData: id } }, { new: true })
                await newAssumpFinnacieras.save();
                return res.status(200).send({ message: 'Assumption Financieras created successfully' });
            }
        } catch (error) {
            return res.status(500).send({ error: error.message });
        }

    },

    eachBienes: (req, res) => {
        const { id } = req.params
        AssumpFinancieras.find({ idUser: id })
            .then(data => res.json({ success: true, response: data }))
            .catch(error => res.json({ succes: false, error }))
    },

}

module.exports = assumpFinancierasController