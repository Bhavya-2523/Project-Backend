const routes = require("express").Router();
const surveyController = require("../controllers/SurveyController");

routes.get("/surveys", surveyController.getAllSurveys);
routes.get("/surveysByUserId/:creatorId", surveyController.getAllSurveysByUserId);
routes.post("/surveys", surveyController.addSurvey);
routes.post("/surveysWithFile", surveyController.addSurveyWithFile);
routes.delete("/surveys/:id", surveyController.deleteSurvey);
routes.get("/surveys/:id", surveyController.getSurveyById);
routes.put("/surveys/:id", surveyController.updateSurvey); // Update a survey by ID

module.exports = routes;
