const Response = require("../models/ResponseModel");
const Survey = require("../models/SurveyModel");

const submitResponse = async (req, res) => {
    try {
        const { surveyId, respondentId, completionTime, sessionId } = req.body;

        const survey = await Survey.findById(surveyId);
        if (!survey) {
            return res.status(404).json({ message: "Survey not found" });
        }

        if (survey.status !== "published") {
            return res.status(400).json({ message: "Survey is not open for responses" });
        }

        const newResponse = new Response({
            surveyId,
            respondentId: respondentId || null,
            completionTime,
            sessionId: sessionId || null
        });

        await newResponse.save();
        res.status(201).json({ message: "Response submitted successfully", response: newResponse });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getResponsesBySurvey = async (req, res) => {
    try {
        const { surveyId } = req.params;

        const responses = await Response.find({ surveyId }).populate("respondentId", "firstName lastName email");
        if (!responses.length) {
            return res.status(404).json({ message: "No responses found for this survey" });
        }

        res.status(200).json({ responses });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getResponseById = async (req, res) => {
    try {
        const { responseId } = req.params;

        const response = await Response.findById(responseId).populate("respondentId", "firstName lastName email");
        if (!response) {
            return res.status(404).json({ message: "Response not found" });
        }

        res.status(200).json({ response });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const deleteResponse = async (req, res) => {
    try {
        const { responseId } = req.params;

        const response = await Response.findByIdAndDelete(responseId);
        if (!response) {
            return res.status(404).json({ message: "Response not found" });
        }

        res.status(200).json({ message: "Response deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = {
    submitResponse,
    getResponsesBySurvey,
    getResponseById,
    deleteResponse
};
