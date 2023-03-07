const User = require("../models/UserModel");

const userController = {
    getUsers: async (req, res) => {

    try {
      const users = await User.find().exec();
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  createUser: async (req, res) => {
    const user = new User({
      email: req.body.email,
      password: req.body.password,
      isVerify: req.body.isVerify,
      favorites: req.body.favorites
    });
  
    try {
      const newUser = await user.save();
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({message: error.message})
    }
  },
};

module.exports = {
  userController,
};
