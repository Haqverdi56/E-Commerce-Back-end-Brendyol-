const User = require("../models/UserModel");
const nodemailer = require("nodemailer");
const userModel = require("../models/UserModel");
var jwt = require("jsonwebtoken");
let privateKey = "ironmaidenironmaidenironmaidenironmaiden";

const transporter = nodemailer.createTransport({
  direct: true,
  host: "smtp.mail.ru",
  port: 465,
  auth: {
    user: "aarizona3@mail.ru",
    pass: "0bPD1xnaDfd52awVehKU",
  },
  secure: true,
});

const userController = {
  getUsers: async (req, res) => {
    try {
      const users = await User.find().exec();
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  login: async (req, res) => {
    let {email, password} = req.body;
    const user = new userModel( {
      email: email,
      password: password,
      favorites: [],
      confirmCode: '',
      isVerified: false
    })

    console.log("doc 2", req.body);
    userModel.findOne({ email: email, password: password })
      .then (doc => {
        if (doc) {

          let confirmCode = Math.floor(Math.random() * 999999);
          doc.confirmCode = confirmCode;

          doc.save()
          .then(saveDoc => {
            res.json(saveDoc)
          }) .catch(saveErr => {
            res.status(500).json(saveErr)
          })
          
          var mailOptions = {
            from: "aarizona3@mail.ru",
            to: doc.email,
            subject: "Login Confirm Code",
            text: "Confirm Code: " + confirmCode,
          };

          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              return console.log("error 1", error);
            }
          });
        } else {
          res.status(404).json({ message: "Not found" });
        }
      }) 
      .catch ((err) => {
        res.status(500).json(err);
      })
      const newUser = await user.save()
  },
  confirmCode: (req, res) => {
    let confirmCode = req.body.confirmCode;

    userModel.findOne({ confirmCode: confirmCode })
    .then(doc => {
      console.log('doc 1', doc)
      if (doc) {
        let token = jwt.sign({ email: "a@a.com" }, privateKey, {
          algorithm: "HS256",
          expiresIn: "5h",
        });
        res.json({ token: token });
      }
    }) .catch(err => {
      res.status(500).json(err);
    })
  }
};

module.exports = {
  userController,
};
