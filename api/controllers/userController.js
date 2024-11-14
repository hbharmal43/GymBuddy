import cloudinary from "../config/cloudinary.js";
import User from "../models/User.js";

export const updateProfile = async (req, res) => {
	// image => cloudinary -> image.cloudinary.your => mongodb

	try {
		const { image, ...otherData } = req.body;

		let updatedData = otherData;

		if (image) {
			// base64 format
			if (image.startsWith("data:image")) {
				try {
					const uploadResponse = await cloudinary.uploader.upload(image);
					updatedData.image = uploadResponse.secure_url;
				} catch (error) {
					console.error("Error uploading image:", uploadError);

					return res.status(400).json({
						success: false,
						message: "Error uploading image",
					});
				}
			}
		}

		const updatedUser = await User.findByIdAndUpdate(req.user.id, updatedData, { new: true });

		res.status(200).json({
			success: true,
			user: updatedUser,
		});
	} catch (error) {
		console.log("Error in updateProfile: ", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};


export const updateStreak = async (req, res) => {
    try {
        const userId = req.user.id; // Ensure this is getting the user ID correctly
        console.log("User ID:", userId);

        const user = await User.findById(userId);
        if (!user) {
            console.log("User not found");
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const today = new Date().setHours(0, 0, 0, 0);
        const lastUpdated = user.streakLastUpdated ? new Date(user.streakLastUpdated).setHours(0, 0, 0, 0) : null;

        if (lastUpdated === today) {
            console.log("Streak already updated today");
            return res.status(200).json({
                success: true,
                message: "Already checked in today",
                streakCount: user.streakCount
            });
        }

        // Increment streak count and update last streak date
        user.streakCount += 1;
        user.streakLastUpdated = new Date();

        await user.save();
        console.log("Streak updated successfully:", user.streakCount);

        return res.status(200).json({
            success: true,
            streakCount: user.streakCount,
        });
    } catch (error) {
        console.error("Error updating streak:", error);
        res.status(500).json({ success: false, message: "Failed to update streak" });
    }
};
