const surveyModel = require("../models/SurveyModel");

const getAllSurveys = async (req, res) => {
    try {
        const surveys = await surveyModel.find().populate("creatorId").populate("categoryId");
        res.json({
            message: "Surveys fetched successfully",
            data: surveys
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching surveys", error: error.message });
    }
};

const addSurvey = async (req, res) => {
    try {
        const savedSurvey = await surveyModel.create(req.body);
        res.json({
            message: "Survey created successfully",
            data: savedSurvey
        });
    } catch (error) {
        res.status(500).json({ message: "Error creating survey", error: error.message });
    }
};

const deleteSurvey = async (req, res) => {
    try {
        const deletedSurvey = await surveyModel.findByIdAndDelete(req.params.id);
        if (!deletedSurvey) {
            return res.status(404).json({ message: "Survey not found" });
        }
        res.json({
            message: "Survey deleted successfully",
            data: deletedSurvey
        });
    } catch (error) {
        res.status(500).json({ message: "Error deleting survey", error: error.message });
    }
};

const getSurveyById = async (req, res) => {
    try {
        const foundSurvey = await surveyModel.findById(req.params.id).populate("creatorId").populate("categoryId");
        if (!foundSurvey) {
            return res.status(404).json({ message: "Survey not found" });
        }
        res.json({
            message: "Survey fetched successfully",
            data: foundSurvey
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching survey", error: error.message });
    }
};

module.exports = {
    getAllSurveys,
    addSurvey,
    deleteSurvey,
    getSurveyById
};