
const SavedNews = require("../models/SavedNews");
const User = require("../models/User");


exports.savedNews =async (req, res) => {
    try{
        console.log("in the backenddddddd");
        const userId = req.user.id;
        const{title, description, published, url, image} = req.body;

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
        const alreadySaved = await SavedNews.find({url});
       
        const URLs = alreadySaved.map((news)=> (news.url)).includes(url);
        console.log("url ", URLs);

        if(URLs) {
        return res.status(401).json({
            success: false,
            message: "Already saved"
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

//get saved news

exports.getSavedNews = async (req,res) => {
    try{
        const userId = req.user.id;
        const isUserExist = await User.findById(userId);

        if(!isUserExist) {
            return res.status(403).json({
                success:false,
                message: "User does not exist",
            });
       } 

        const userData = await User.find({});
        const allData = await userData[0].populate("savedPosts")
        console.log("printing all data",allData);

        return res.status(200).json({
            success: true,
            data: allData,
            message: "Saved post data fetched successfully",
        })
      
    } catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message: "Error in fetching saved news",
        })
    }
}

//delete saved news

exports.deleteSavedNews = async(req,res) => {
    try{
        const userId = req.user.id;
        const {newsId} = req.body;

        console.log("printing req ki body",req.body)
        const isUserExist = await User.findById(userId);

        if(!isUserExist) {
            return res.status(403).json({
                success:false,
                message: "User does not exist",
            });
       } 

       await SavedNews.findByIdAndDelete(newsId);
       await User.findByIdAndUpdate(userId,{
        $pull: {savedPosts: newsId}
       },{new:true})
      const news = await SavedNews.findById(newsId);
      console.log("printing newsssssssssssss",news)

      const userData = await User.find({});
      const updatedData = await userData[0].populate("savedPosts")
       console.log("printing updated daat",updatedData);

    //    console.log("k haal h bhai");
    //    const savedNews = await SavedNews.findOne({url: {$eq: url}});
    //    console.log("printing saved newsss",savedNews);
    // //    User.findOneAndDelete({url: url},{new:true});
    // // const userData = await User.find({});
    // // const allData = await userData[0].populate("savedPosts")
    // //    console.log("k haal h bhai",allData);
       return res.status(200).json({
        success:true,
        updatedData,
        message:"Deleted successfully",
       });

    } catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message: "Error in deleting saved news",
        })
    }
}