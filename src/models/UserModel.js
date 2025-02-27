const mongoose = require ("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
   firstName: {
      type: String,
      required: true
   },
   lastName: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true,
      unique: true
   },
   password: {
      type: String,
      required: true
   },
   role: {
      type: String,
      enum: ["admin", "respondent", "creator"], // Restrict role values
      required: true
   }
}, { timestamps: true }); // Adds `createdAt` & `updatedAt` automatically

module.exports = mongoose.model("users",userSchema)