const userProfileSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "users", required: true, unique: true }, 
    profilePicture: { type: String }, // Store URL
    bio: { type: String },
    address: { type: String },
    socialLinks: {
       facebook: { type: String },
       twitter: { type: String },
       linkedin: { type: String },
    }
 }, { timestamps: true });
 
 module.exports = mongoose.model("user_profiles", userProfileSchema);
 