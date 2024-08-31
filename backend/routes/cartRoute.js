const express = require("express");
const { getCart, addCart, removeCart } = require("../controllers/cartController");
const { authMiddleware } = require("../middlewares/auth")

const cartRouter = express.Router();

cartRouter.post("/addCart", authMiddleware, addCart)
cartRouter.post("/removeCart", authMiddleware, removeCart)
cartRouter.get("/getCart", authMiddleware, getCart);

module.exports = {
    cartRouter
}