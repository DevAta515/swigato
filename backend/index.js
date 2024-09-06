require('dotenv').config();
const express = require("express");
const cors = require("cors");
const { orderRouter } = require("./routes/orderRoute")
const { connection } = require("./config/db.js");
const { foodRouter } = require("./routes/foodRoute.js");
const { userRouter } = require("./routes/userRoute.js");
const { cartRouter } = require("./routes/cartRoute.js");
const { resetCartData } = require("./models/userModel.js")


const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/images", express.static("uploads"));

(async () => {
    try {
        await connection(); // Await the connection before starting the server
        console.log("Database connected successfully");
        resetCartData();

        app.get("/", (req, res) => {
            res.send("API working");
        });

        app.listen(PORT, () => {
            console.log(`Server started on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Error connecting to the database:", error);
        process.exit(1); // Exit the process if the connection fails
    }
})();
