import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        age: {
            type: Number,
            required: true,
        },
        gender: {
            type: String,
            required: true,
            enum: ["male", "female"],
        },
        genderPreference: {
            type: String,
            required: true,
            enum: ["male", "female", "both"],
        },
        bio: { type: String, default: "" },
        image: { type: String, default: "" },
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        dislikes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        matches: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
		streakCount: { type: Number, default: 0 },
		lastLoginDate: { type: Date, default: null }, 
    },
    { timestamps: true }
);
userSchema.pre("save", async function (next) {
    // Only hash the password if it is new or was modified
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
