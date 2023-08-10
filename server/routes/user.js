const express = require("express");
const router = express.Router();

const{login , signup} = require("../controllers/Auth");
const {savedNews, getSavedNews,deleteSavedNews} = require("../controllers/SavedNews");
const{auth} = require("../middlewares/auth");

router.post("/login" , login);
router.post("/signup" , signup);
router.put("/saved",auth, savedNews);
router.get("/getSaved", auth, getSavedNews);
router.delete("/delete", auth, deleteSavedNews);

router.get("/test" , auth , (req,res) => {
    res.json({
        success: true,
        message: "Welcome to test route for authentication",
    });
});

module.exports = router;