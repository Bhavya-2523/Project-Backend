const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const answerSchema = new Schema({
    // responseId: {
    //     type: Schema.Types.ObjectId,
    //     ref: "responses",
    //     // required: true
    // },
    surveyId: {
        type: Schema.Types.ObjectId,
        ref: "surveys", // make sure this matches your Survey model name
        required: true
      },
    questionId: {
        type: Schema.Types.ObjectId,
        ref: "questions", 
        required: true
    },
    answerText: {
        type: String,
        maxlength: 500,
        default: null
    },
    selectedOption: {
        type: String,
        maxlength: 100,
        default: null
    },
    ratingValue: {
        type: Number,
        min: 1,
        max: 5,
        default: null
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("answers", answerSchema);