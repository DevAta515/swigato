const { userModel } = require("../models/userModel");

const addCart = async (req, res) => {
    try {
        const { userId, id } = req.body;
        const userData = await userModel.findById(userId);
        const cartData = userData.cartData;

        cartData[id] = cartData[id] ? cartData[id] + 1 : 1;

        await userModel.findByIdAndUpdate(userId, { cartData });
        return res.json({ success: true, message: "Added to Cart" });
    } catch (error) {
        return res.json({ success: false, error });
    }
};

const removeCart = async (req, res) => {
    try {
        const { userId, id } = req.body;
        const userData = await userModel.findById(userId);
        const cartData = userData.cartData;

        if (cartData[id] > 0) {
            cartData[id] -= 1;
            if (cartData[id] === 0) {
                delete cartData[id];
            }
        }

        await userModel.findByIdAndUpdate(userId, { cartData });
        return res.json({ success: true, cartData });
    } catch (error) {
        return res.json({ success: false, error });
    }
};

const getCart = async (req, res) => {
    try {
        const { userId } = req.body;
        const userData = await userModel.findById(userId);
        const cartData = userData.cartData;

        return res.json({ success: true, cartData });
    } catch (error) {
        return res.json({ success: false, error });
    }
};

module.exports = {
    addCart,
    removeCart,
    getCart,
};
