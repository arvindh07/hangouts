import mongoose from "mongoose";
import app from "./app.js";

const PORT = process.env.PORT || 6999;

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(PORT, () => {
            console.log("Connected to db and Server is running...");
        })
    })
    .catch((err) => {
        console.log("Db err -> ", err);
    })