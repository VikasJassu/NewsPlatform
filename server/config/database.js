const mongoose = require("mongoose");

require("dotenv").config();

exports.connectDB = () => {
    mongoose.connect(process.env.MONGODB_URL , {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("connection with database is successfull");
    })
    .catch((error) => {
        console.log("error in connection with database");
        console.error(error);
        process.exit(1);
    })
}