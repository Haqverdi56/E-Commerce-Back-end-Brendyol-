const User = require("../models/UserModel");
const nodemailer = require("nodemailer");
const userModel = require("../models/UserModel");
var jwt = require("jsonwebtoken");
let privateKey = "ironmaidenironmaidenironmaidenironmaiden";

const transporter = nodemailer.createTransport({
  direct: true,
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: "ecommercedeveloper1@gmail.com",
    pass: "uzvxyehggdomgaxm",
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
  register: async (req, res) => {
    const { email, password, userName } = req.body;
    console.log(req.body);
    try {
      const existingUser = await userModel.findOne({ email });

      if (existingUser) {
        return res.status(409).json({ message: 'Email already exists' });
      }

      const newUser = await userModel.create({ email, password, userName });
      return res.status(201).json(newUser);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Server error' });
    }
  },
  login: async (req, res) => {
    let {email, password, userName} = req.body;
    const user = new userModel( {
      email: email,
      password: password,
      favorites: [],
      confirmCode: '',
      isVerified: false
    })

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
            from: "ecommercedeveloper1@gmail.com",
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
  },
  confirmCode: (req, res) => {
    let confirmCode = req.body.confirmCode;
    
    userModel.findOne({ confirmCode: confirmCode })
    .then(doc => {
      if (doc) {
        let token = jwt.sign({ email: userModel.email }, privateKey, {
          algorithm: "HS256",
          expiresIn: "5h",
        });
        res.json({ token: token, user: doc });
      }
    }) .catch(err => {
      res.status(500).json(err);
    })
  }
};

module.exports = {
  userController,
};
