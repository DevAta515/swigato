const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    cartData: {
        type: Object,
        default: {}
    }
}, { minimize: false });

const userModel = mongoose.models.user || mongoose.model("user", userSchema);
async function resetCartData() {
    try {
        await userModel.updateMany({}, { $set: { cartData: {} } });
        console.log("Cart data reset successfully for all users.");
    } catch (error) {
        console.error("Error resetting cart data:", error);
    }
}

module.exports = {
    userModel,
    resetCartData
};
