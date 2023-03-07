const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;

const userSchema = Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isVerify: {
        type: Boolean,
        required: true
    },
    favorites: [
        {
            type: String
        }
    ]
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel