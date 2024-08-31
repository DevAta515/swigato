const express = require("express");
const { addFood, listFood, removeFood } = require("../controllers/foodController");
const multer = require("multer");
const path = require("path");

const foodRouter = express.Router();


const imageStorage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        const extension = path.extname(file.originalname);
        return cb(null, `${Date.now()}${extension}`);
    }
})
const upload = multer({ storage: imageStorage });


foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list", listFood);
foodRouter.delete("/remove", removeFood)



module.exports = {
    foodRouter
} 