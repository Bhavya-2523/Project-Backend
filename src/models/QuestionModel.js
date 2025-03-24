const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    surveyId: {
        type: Schema.Types.ObjectId,
        ref: "surveys",
        required: true
    },
    questionText: {
        type: String,
        maxlength: 300,
        required: true
    },
    questionType: {
        type: String,
        enum: ["Multiple Choice", "Short Answer", "Checkbox", "Rating Scale", "Yes/No", "Dropdown"],
        required: true
    },
    options: {
        type: [String],
        validate: {
            validator: function (arr) {
                return (
                    !["Multiple Choice", "Dropdown", "Checkbox"].includes(this.questionType) || 
                    (Array.isArray(arr) && arr.length <= 10 && arr.every(opt => opt.length <= 100))
                );
            },
            message: "Options are required for MCQ, Checkbox, and Dropdown (max 10 items, 100 chars each)."
        }
    },
    required: {
        type: Boolean,
        default: false
    },
    questionOrder: {
        type: Number,
        required: true
    },
    scaleMin: {
        type: Number,
        min: 1,
        max: 10,
        required: function () {
            return this.questionType === "Rating Scale";
        }
    },
    scaleMax: {
        type: Number,
        min: 1,
        max: 10,
        required: function () {
            return this.questionType === "Rating Scale";
        }
    },
    validationRules: {
        type: Schema.Types.Mixed,
        default: null
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("questions", questionSchema);
