const Answer = require("../models/AnswerModel");
const Response = require("../models/ResponseModel");

const submitAnswer = async (req, res) => {
    try {
        const { responseId, questionId, answerText, selectedOption, ratingValue } = req.body;

        // const response = await Response.findById(responseId);
        // if (!response) {
        //     return res.status(404).json({ message: "Response not found" });
        // }

        const newAnswer = new Answer({
            responseId,
            questionId,
            answerText: answerText || null,
            selectedOption: selectedOption || null,
            ratingValue: ratingValue || null
        });

        await newAnswer.save();
        res.status(201).json({ message: "Answer submitted successfully", answer: newAnswer });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getAnswersByResponse = async (req, res) => {
    try {
        const { responseId } = req.params;

        const answers = await Answer.find({ responseId }).populate("questionId", "questionText");
        if (!answers.length) {
            return res.status(404).json({ message: "No answers found for this response" });
        }

        res.status(200).json({ answers });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const deleteAnswer = async (req, res) => {
    try {
        const { answerId } = req.params;

        const answer = await Answer.findByIdAndDelete(answerId);
        if (!answer) {
            return res.status(404).json({ message: "Answer not found" });
        }

        res.status(200).json({ message: "Answer deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = {
    submitAnswer,
    getAnswersByResponse,
    deleteAnswer
};