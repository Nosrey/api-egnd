const AssumptionVenta = require("../models/AssumptionVenta")
const User = require("../models/User")


const assumptionVentaController = {

    createAssump: async (req, res) => {
        try {
            const assumpExists = await AssumptionVenta.findOne({ idUser: req.body.idUser });
            if (assumpExists) {
                if (Array.isArray(req.body.canales) && req.body.canales.length > 0) {
                    assumpExists.canales = req.body.canales;
                }
                if (Array.isArray(req.body.churns) && req.body.churns.length > 0) {
                    assumpExists.churns = req.body.churns;
                }

                if (Array.isArray(req.body.paises) && req.body.paises.length > 0) {
                    assumpExists.paises = req.body.paises;
                }
                if (Array.isArray(req.body.productos) && req.body.productos.length > 0) {
                    assumpExists.productos = req.body.productos;
                }

                var id = assumpExists._id
                console.log(id)
                await User.findOneAndUpdate({ _id: req.body.idUser }, { $set: { assumptionData: id } }, { new: true })

                await assumpExists.save();
                return res.status(200).send({ message: 'Assumption updated successfully' });
            } else {
                const newAssump = new AssumptionVenta({
                    canales: req.body.canales,
                    churns: req.body.churns,
                    paises: req.body.paises,
                    productos: req.body.productos,
                    idUser: req.body.idUser
                });

                var id = newAssump._id
                await User.findOneAndUpdate({ _id: req.body.idUser }, { $set: { assumptionData: id } }, { new: true })
                await newAssump.save();
                return res.status(200).send({ message: 'Assumption Info created successfully' });
            }
        } catch (error) {
            return res.status(500).send({ error: error.message });
        }
    },

    eachProduct: (req, res) => {
        const { id } = req.params
        AssumptionVenta.find({ idUser: id })
            .then(data => res.json({ success: true, response: data }))
            .catch(error => res.json({ succes: false, error }))
    },

}

module.exports = assumptionVentaController