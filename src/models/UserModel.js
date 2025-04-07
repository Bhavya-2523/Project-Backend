const mongoose = require ("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
   userName: { type: String, required: true },
   fullName: { type: String, required: true },
   email: { type: String, required: true, unique: true },
   phone: { type: Number, required: true },
   password: { type: String, required: true },
   roleId: { type: Schema.Types.ObjectId, ref: "roles" },
   bio: {type:String},
   address: String,
   socialLinks: {
     facebook: String,
     twitter: String,
     linkedin: String
   },
   profileImage: {type:String}
 }, { timestamps: true });

module.exports = mongoose.model("users",userSchema)