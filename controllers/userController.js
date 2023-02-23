const User = require("../models/User")
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userController = {
  signUp: async (req, res) => {
    var errors = []
    const { mail, password, businessName, businessInfo,  assumptionInfo, volumenInfo } = req.body
    const emailExists = await User.findOne({ mail: mail })
    if (emailExists) {
      errors.push("El usuario ya existe")
    }
    if (errors.length === 0) {
      const passwordHashed = bcryptjs.hashSync(password, 10)

      var newUser = new User({
        mail, businessName, password: passwordHashed, businessInfo, assumptionInfo, volumenInfo
      })
      var newUserSaved = await newUser.save()
      var token = jwt.sign({ ...newUserSaved }, process.env.SECRET_KEY, {})
    }
    return res.json({
      success: errors.length === 0 ? true : false,
      errors: errors,
      response: errors.length === 0 && { token, mail: newUserSaved.mail, businessName, id: newUserSaved._id, assumptionInfo }
    })
  },
  signIn: async (req, res) => {
    var errors = []
    const { mail, password } = req.body
    const userExists = await User.findOne({ mail: mail })
    if (!userExists) {
      return res.json({ success: false, response: 'La contraseña o el mail es incorrecto' })
    }
    const passwordMatches = bcryptjs.compareSync(password, userExists.password)
    if (!passwordMatches) {
      return res.json({ success: false, response: 'La contraseña o el mail es incorrecto' })
    }
    var token = jwt.sign({ ...userExists }, process.env.SECRET_KEY, {})
    return res.json({ success: true, response: { token, mail: userExists.mail, id: userExists._id } })
  },

  eachUser: (req, res) => {
    const id = req.params.id
    User.findById(id).populate('assumptionData').populate('bienesData').populate('volumenData').populate('costoData').populate('gastosData').populate('precioData').populate('puestosQData').populate('puestosVData').populate('assumpFinancierasData')
    .then(data => {
      return res.json({ success: true, response: data })
    })
    .catch(error => {
      return res.json({ success: false, error: error })
    })
  },

  updateBusinessInfo: async (req, res) => {
    const id = req.params.id
    User.findByIdAndUpdate(id, req.body)
      .then(businessInfoUpdated => {
        res.json({ succes: true, businessInfoUpdated })
      })
      .catch(error => {
        res.json({ succes: false, error })
      })
  },

  allUsers: (req, res) => {
    User.find()
      .then(data => {
        return res.json({ success: true, response: data })
      })
      .catch(error => {
        return res.json({ success: false, error: error })
      })
  },

}

module.exports = userController