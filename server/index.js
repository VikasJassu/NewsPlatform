const express = require("express");
const app = express();
const cors = require("cors");
const userRoute = require("./routes/user");
require("dotenv").config();

const PORT = process.env.PORT || 4000;

const cookieParser = require("cookie-parser");
 

app.use(express.json());
app.use(cookieParser()); 
app.use(
	cors({
		origin:"https://news-platform-oz3n.vercel.app",
		credentials:true,
	})
)

require("./config/database").connectDB();



app.use("/api/v1" , userRoute);


app.listen(PORT , () => {
    console.log(`server started at ${PORT}`);
});


app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});
