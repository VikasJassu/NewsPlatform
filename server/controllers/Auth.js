const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

require("dotenv").config();

exports.signup = async (req,res) => {
   
    try {
        const{name , email , password, confirmPassword} = req.body;

        if(!name || !email || !password || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        if(password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password and confirmPassword is not same",
            })
        }
        const existingUser = await User.findOne({email});

        if(existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already registered"
            });
        }

        let hashedPassword;
        try{
            hashedPassword = await bcrypt.hash(password , 10);
        }
        catch(e) {
            return res.status(500).json({
                success: false,
                message: " Error in hashing password"
            });
        }
        
        const user = await User.create({
            name , email , password: hashedPassword
        });

        return res.status(200).json({
            success: true,
            message: "User registered successfully"
        });

    }

    catch(e) {
        console.error(e);
        return res.status(400).json({
            success: false,
            message: "Error in registering user"
        });
    }
}


//login page


exports.login = async (req, res) => {
    try {
        const{email,password} = req.body;

        //valindation of email and password , no parameter should be empty
            if(!email || !password) {
                res.status(400).json({
                    success: false,
                    message: "Please enter all required details"
                });
            }    

            const user = await User.findOne({email});
            if(!user) {
                res.status(401).json({
                    success: false,
                    message: "User is not registered"
                });
            }

            //JWT token ki body create kro
            const payload = {
                email: user.email,
                id: user._id,
                role: user.role
            };

            //compare password and create JWT token
            if(await bcrypt.compare(password , user.password)) {
                let token = jwt.sign(payload , process.env.JWT_SECRET , {
                    expiresIn: "2h",
                });
                // user = user.toObject();
                user.token = token;
                user.password = undefined;
                
                const options = {
                    expires : new Date( Date.now() + 3*24*60*60*1000),
                    httpOnly: true
                }

                res.cookie("token" , token , options).status(200).json({
                    success:true,
                    token,
                    user,
                    message: "User logged in successfully"
                });
            }

            else {
                res.status(400).json({
                    success: false,
                    message: " Incorrect Password"
                });
            }

          
        
    }
    catch(e) {
        console.error(e);
        res.status(400).json({
            success: false,
            message:"Error in login"
        });
    }
}