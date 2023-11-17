const User = require("../models/User")
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const crypto = require("crypto");


aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY
});

const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "egnd-bucket",

    key: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err, hash);
        const fileName = `${hash.toString('hex')}`;
        cb(null, fileName);
      });
    }
  })
});

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
    User.findById(id).populate('assumptionData').populate('bienesData').populate('volumenData').populate('costoData').populate('gastosData').populate('precioData').populate('puestosQData').populate('puestosVData').populate('puestosPxQData').populate('assumpFinancierasData').populate('gastosGeneralData').populate('gastosPorCCData').populate('puestosPData').populate('capexPData').populate('capexQData').populate('mercadoData').populate('prestamos').then(data => {
      return res.json({ success: true, response: data })
    })
    .catch(error => {
      return res.json({ success: false, error: error })
    })
  },

  updateBusinessInfo: async (req, res) => {
    const id = req.params.id;
    const uploadPromise = new Promise((resolve, reject) => {
      upload.single('image')(req, res, function (err) {
        if (err instanceof multer.MulterError) {
          // A Multer error occurred when uploading.
          console.log(err);
          reject("Error uploading image.");
        } else if (err) {
          // An unknown error occurred when uploading.
          console.log(err);
          reject("Error uploading image.");
        } else {
          // Everything went fine.
          resolve();
        }
      });
    });
  
    try {
      await uploadPromise; // Wait for image upload to complete
      const { businessName, businessInfo, assumptionInfo, volumenInfo } = req.body;
      const imagePath = req.file ? req.file.location : null;
  
      const parsedBusinessInfo = JSON.parse(businessInfo); // Parse businessInfo as JSON
  
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { businessName, businessInfo: parsedBusinessInfo, assumptionInfo, volumenInfo, imagePath },
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ success: false, error: "User not found." });
      }
  
      return res.json({ success: true, response: updatedUser });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, error: error.message });
    }
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