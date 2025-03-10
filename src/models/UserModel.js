const mongoose = require ("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
   userName: {
      type: String,
      required: true
   },
   fullName: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true,
      unique: true
   },
   phone:{
      type:Number,
      required:true,
   },
   password: {
      type: String,
      required: true
   },
   confirmPassword: {
      type: String,
      required: true
   },
   roleId:{
      type:Schema.Types.ObjectId,
      ref:"roles"
   }
   // role: {
   //    type: String,
   //    enum: ["admin", "respondent", "creator"], // Restrict role values
   //    required: true
   // }
}, { timestamps: true }); // Adds `createdAt` & `updatedAt` automatically

module.exports = mongoose.model("users",userSchema)