const { orderModel } = require("../models/orderModel");
const Stripe = require("stripe");
require('dotenv').config();
const { userModel } = require("../models/userModel");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2022-11-15',
});

const placeOrder = async (req, res) => {
    const frontURL = "https://swigato-frontend-sjtv.onrender.com/";
    try {
        const { userId, items, amount, address } = req.body;

        const newOrder = new orderModel({
            userId,
            items,
            amount,
            address,
        });
        await newOrder.save();
        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        const line_items = items.map(({ name, price, quantity }) => ({
            price_data: {
                currency: "inr",
                product_data: { name },
                unit_amount: price * 100 * 80,
            },
            quantity,
        }));

        line_items.push({
            price_data: {
                currency: "inr",
                product_data: { name: "Delivery Charges" },
                unit_amount: 2 * 100 * 80,
            },
            quantity: 1,
        });

        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: 'payment',
            success_url: `${frontURL}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontURL}/verify?success=false&orderId=${newOrder._id}`,
        });

        res.json({ success: true, session_url: session.url });
    } catch (error) {
        res.status(500).json({ success: false, message: "Order processing failed", error: error.message });
    }
}

const verifyOrder = async (req, res) => {
    const { success, orderId } = req.body;
    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            return res.json({ success: true, message: "Paid" });
        } else {
            await orderModel.findByIdAndDelete(orderId);
            return res.json({ success: false, message: "Not Paid" });
        }
    } catch (error) {
        return res.json({ success: false, error });
    }
}

const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId });
        return res.json({ success: true, orders });
    } catch (error) {
        return res.json({ success: false, error });
    }
}

const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        return res.json({ success: true, orders });
    } catch (error) {
        return res.json({ success: false, error });
    }
}

const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        return res.json({ success: true, message: "Updated" });
    } catch (error) {
        return res.json({ success: false, error });
    }
}

module.exports = {
    placeOrder,
    verifyOrder,
    userOrders,
    listOrders,
    updateStatus,
};
