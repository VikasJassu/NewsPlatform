const SavedNews = require("../models/SavedNews");
const User = require("../models/User");


exports.savedNews =async (req, res) => {
    try{
        console.log("in the backenddddddd");
        const userId = req.user.id;
        const{title, description, published, url, image,token} = req.body;

        if(!title || !description || !published || !url || !image) {
            return res.status(403).json({
                success:false,
                message: "All fields are required",
            });
        }

       const isUserExist = await User.findById(userId);

       if(!isUserExist) {
            return res.status(403).json({
                success:false,
                message: "User does not exist",
            });
       }

       const newSaved = await SavedNews.create({
            title,
            description,
            published,
            url,
            image
       });

       await User.findByIdAndUpdate(
        {
            _id: userId,
        },
        {
            $push:{
                savedPosts: newSaved._id,
            },
        }
       );

       return res.status(200).json({
        success:true,
        message: "News saved successfully",
       });


    } catch(error) {
        console.log(error);
        return res.status(401).json({
            success: false,
            message: "Error in post saving",
        });
    }
}