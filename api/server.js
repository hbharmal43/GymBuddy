import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { createServer } from "http";
import OpenAI from "openai";
import User from "./models/User.js"; // Ensure User model is imported
import { verifyToken } from "./middleware/auth.js"; // Import the middleware
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import matchRoutes from "./routes/matchRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import { connectDB } from "./config/db.js";
import { initializeSocket } from "./socket/socket.server.js";

dotenv.config();

const app = express();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const httpServer = createServer(app);
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/matches", matchRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, "/client/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
    });
}

// Route to generate fitness plan using OpenAI
app.post("/generate-plan", async (req, res) => {
    try {
        const { goal } = req.body;
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are a fitness assistant." },
                { role: "user", content: `Create a fitness plan for the goal: ${goal}` },
            ],
        });

        res.json({ plan: completion.choices[0].message.content });
    } catch (error) {
        console.error("Error generating plan:", error);
        res.status(500).json({ error: "Failed to generate plan" });
    }
});

// Route to update the user's streak
app.post("/api/update-streak", verifyToken, async (req, res) => {
    try {
        const userId = req.user.id; // Assuming user is authenticated
        const user = await User.findById(userId);

        const today = new Date().toDateString(); // Format today as a simple date string (e.g., "Tue Nov 14 2023")
        const lastCheckInDate = user.lastCheckInDate?.toDateString(); // Compare against the stored date

        // Only increment if the last check-in was not today
        if (lastCheckInDate !== today) {
            user.streakCount = (user.streakCount || 0) + 1;
            user.lastCheckInDate = new Date(); // Update to the current date
            await user.save();
        }

        res.json({ streakCount: user.streakCount });
    } catch (error) {
        console.error("Error updating streak:", error);
        res.status(500).json({ message: "Failed to update streak" });
    }
});

initializeSocket(httpServer);

httpServer.listen(PORT, () => {
    console.log("Server started on port:", PORT);
    connectDB();
});
