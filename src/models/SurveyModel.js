const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const surveySchema = new Schema({
    creatorId: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: "categories",
        required:true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    // expiryDate: {
    //     type: Date,
    //     required: false, // ✅ Optional, if some surveys should not expire
    // },
    surveyStatus: {
        type: String,
        enum: ["draft", "published", "closed"], 
        default: "draft", 
        required: true
    },
    questions: [{
        type: Schema.Types.ObjectId,
        ref: "questions" 
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model("surveys", surveySchema);
