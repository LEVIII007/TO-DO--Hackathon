import { connect, disconnect } from "mongoose";
import { config } from "dotenv";
config();

async function connectToDatabase() {
    try {
        await connect(process.env.MONGODB_URL);
        console.log("Connected to database");
    } catch (error) {
        console.error("Error connecting to database: ", error);
    }
}


async function disconnectFromDatabase() {
    try {
        await disconnect();
        console.log("Disconnected from database");
    } catch (error) {
        console.error("Error disconnecting from database: ", error);
    }
}


export { connectToDatabase, disconnectFromDatabase };



