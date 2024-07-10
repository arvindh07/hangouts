import app from "./server.js";

const PORT = process.env.PORT || 6999;

app.listen(PORT, () => {
    console.log("Server is running...");
})