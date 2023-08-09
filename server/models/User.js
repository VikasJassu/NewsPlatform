const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    token:{
        type:String,
    },
    savedPosts: [
        {
            type:mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "SavedNews"
        }
    ]

},
{ timestamps: true }

);

module.exports = mongoose.model("User",userSchema);