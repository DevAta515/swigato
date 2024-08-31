const { foodModel } = require("../models/foodModel");
const fs = require("fs");

const addFood = async (req, res) => {
    const { name, description, price, category } = req.body;
    const image_filename = req.file.filename;

    const food = new foodModel({
        name,
        description,
        price,
        category,
        image: image_filename,
    });

    try {
        await food.save();
        res.json({ success: true });
    } catch (error) {
        res.json({ error });
    }
};

const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, list: foods });
    } catch (error) {
        res.json({ success: false, error });
    }
};

const removeFood = async (req, res) => {
    try {
        const { id } = req.body;
        const item = await foodModel.findById(id);

        fs.unlink(`uploads/${item.image}`, () => { });
        await foodModel.findByIdAndDelete(id);

        res.json({ success: true, item });
    } catch (error) {
        res.json({ error });
    }
};

module.exports = {
    addFood,
    listFood,
    removeFood,
};
