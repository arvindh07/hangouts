import app from "./app.js";
import { connectToDb } from "./connectToDb.js";

const PORT = process.env.PORT || 6999;

await connectToDb();
app.listen(PORT, () => {
    console.log(`Connected to db and Server is running on port ${PORT}...`);
})