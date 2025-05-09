const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const responseSchema = new Schema({
    surveyId: {
        type: Schema.Types.ObjectId,
        ref: "surveys", // Links response to a survey
        // required: true
    },
    respondentId: {
        type: Schema.Types.ObjectId,
        ref: "users",
        default: null
    },
    submittedAt: {
        type: Date,
        default: Date.now
    },
    completionTime: {
        type: Number,
        min: 0.0,
        // required: true
    },
    sessionId: {
        type: String, 
        default: null
    }
}, {
    timestamps: true 
});

module.exports = mongoose.model("responses", responseSchema);
