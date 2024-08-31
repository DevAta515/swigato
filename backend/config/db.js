const mongoose = require("mongoose");

const connection = async () => {
    try {
        await mongoose.connect(
            "mongodb+srv://220104021:2LCbItzP3FEvS5q9@cluster0.l7f8eqy.mongodb.net/Swigato"
        );
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
        process.exit(1); // Exit the process with failure
    }
};

module.exports = {
    connection,
};
