const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    surveyId: {
        type: Schema.Types.ObjectId,
        ref: "surveys", // ✅ Links the question to a specific survey
        required: true
    },
    questionText: {
        type: String,
        required: true // ✅ Every question must have text
    },
    questionType: {
        type: String,
        enum: ["text", "multiple-choice", "checkbox", "rating", "dropdown"],
        required: true
    },
    options: {
        type: [String], // ✅ Only needed for multiple-choice, checkbox, dropdown
        required: function() {
            return ["multiple-choice", "checkbox", "dropdown"].includes(this.questionType);
        }
    },
    required: {
        type: Boolean,
        default: false // ✅ Default: Question is not mandatory
    }
}, {
    timestamps: true // ✅ Auto-adds `createdAt` & `updatedAt`
});

module.exports = mongoose.model("questions", questionSchema);
