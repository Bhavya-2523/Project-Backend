const questionModel = require("../models/QuestionModel");

// ✅ Get all questions
const getAllQuestions = async (req, res) => {
    try {
        const questions = await questionModel.find().populate("surveyId");
        res.json({
            message: "Questions fetched successfully",
            data: questions
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching questions", error: error.message });
    }
};

// ✅ Get questions by Survey ID
const getQuestionsBySurveyId = async (req, res) => {
    try {
        const questions = await questionModel.find({ surveyId: req.params.surveyId }).populate("surveyId");
        if (questions.length === 0) {
            return res.status(404).json({ message: "No questions found for this survey" });
        }
        res.json({
            message: "Questions fetched successfully",
            data: questions
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching questions", error: error.message });
    }
};

// ✅ Add a new question
const addQuestion = async (req, res) => {
    try {
        const newQuestion = await questionModel.create(req.body);
        res.json({
            message: "Question added successfully",
            data: newQuestion
        });
    } catch (error) {
        res.status(500).json({ message: "Error adding question", error: error.message });
    }
};

// ✅ Update an existing question
const updateQuestion = async (req, res) => {
    try {
        const updatedQuestion = await questionModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedQuestion) {
            return res.status(404).json({ message: "Question not found" });
        }
        res.json({
            message: "Question updated successfully",
            data: updatedQuestion
        });
    } catch (error) {
        res.status(500).json({ message: "Error updating question", error: error.message });
    }
};

// ✅ Delete a question
const deleteQuestion = async (req, res) => {
    try {
        const deletedQuestion = await questionModel.findByIdAndDelete(req.params.id);
        if (!deletedQuestion) {
            return res.status(404).json({ message: "Question not found" });
        }
        res.json({
            message: "Question deleted successfully",
            data: deletedQuestion
        });
    } catch (error) {
        res.status(500).json({ message: "Error deleting question", error: error.message });
    }
};

// ✅ Get a single question by ID
const getQuestionById = async (req, res) => {
    try {
        const question = await questionModel.findById(req.params.id).populate("surveyId");
        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }
        res.json({
            message: "Question fetched successfully",
            data: question
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching question", error: error.message });
    }
};

module.exports = {
    getAllQuestions,
    getQuestionsBySurveyId,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    getQuestionById
};
