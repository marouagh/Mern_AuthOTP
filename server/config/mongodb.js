import mongoose from "mongoose";

const connectDB = async () => {
    try {
        // Connecting to MongoDB
        await mongoose.connect(`${process.env.MONGODB_URI}/AuthMernstack`);

        // "connected"
        mongoose.connection.on('connected', () => {
            console.log("✅ Database Connected");
        });

        // (Optional) Event in case of an error
        mongoose.connection.on('error', (err) => {
            console.error("❌ MongoDB connection error:", err);
        });
    } catch (error) {
        console.error("❌ Failed to connect to MongoDB:", error);
        process.exit(1);// Stop the process if the connection fails
    }
};

export default connectDB;
