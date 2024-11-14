import User from "../models/User.js";
import jwt from "jsonwebtoken";

const signToken = (id) => {
	// jwt token
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: "30d",
	});
};

// During signup
export const signup = async (req, res) => {
	const { name, email, password, age, gender, genderPreference } = req.body;
	try {
		const newUser = await User.create({
			name,
			email,
			password, // This should be hashed by the pre-save hook
			age,
			gender,
			genderPreference,
		});
		console.log("Stored hashed password:", newUser.password);

		const token = signToken(newUser._id);
		res.cookie("jwt", token, {
			maxAge: 7 * 24 * 60 * 60 * 1000,
			httpOnly: true,
			sameSite: "strict",
			secure: process.env.NODE_ENV === "production",
		});
		res.status(201).json({ success: true, user: newUser });
	} catch (error) {
		console.error("Error in signup:", error);
		res.status(500).json({ success: false, message: "Server error" });
	}
};

// During login
export const login = async (req, res) => {
	const { email, password } = req.body;

	try {
		if (!email || !password) {
			return res.status(400).json({ message: "All fields are required" });
		}

		const user = await User.findOne({ email }).select("+password");

		if (!user || !(await user.matchPassword(password))) {
			return res.status(401).json({ message: "Invalid email or password" });
		}

		const today = new Date();
		const lastLoginDate = user.lastLoginDate ? new Date(user.lastLoginDate) : null;

		// Increment streak only if lastLoginDate is not today
		if (!lastLoginDate || lastLoginDate.toDateString() !== today.toDateString()) {
			user.streakCount = (user.streakCount || 0) + 1;
			user.lastLoginDate = today;  // Update lastLoginDate to today’s date
		}

		// Save the user only if there was an update to streakCount or lastLoginDate
		await user.save();

		const token = signToken(user._id);
		res.cookie("jwt", token, {
			maxAge: 7 * 24 * 60 * 60 * 1000,
			httpOnly: true,
			sameSite: "strict",
			secure: process.env.NODE_ENV === "production",
		});

		res.status(200).json({
			success: true,
			user: {
				...user.toObject(),
				streakCount: user.streakCount, // Send updated streak count
			},
		});
	} catch (error) {
		console.error("Error in login:", error);
		res.status(500).json({ message: "Server error" });
	}
};

export const logout = async (req, res) => {
	res.clearCookie("jwt");
	res.status(200).json({ success: true, message: "Logged out successfully" });
};
