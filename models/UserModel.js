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
    confirmCode: String
    ,
    isVerified: {
        type: Boolean,
        default: false
    },
    favorites: [
        {
            type: String
        }
    ]
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel