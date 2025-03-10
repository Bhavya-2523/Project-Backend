const routes = require("express").Router();
const surveyController = require("../controllers/SurveyController");

routes.get("/surveys", surveyController.getAllSurveys);
routes.post("/surveys", surveyController.addSurvey);
routes.delete("/surveys/:id", surveyController.deleteSurvey);
routes.get("/surveys/:id", surveyController.getSurveyById);

module.exports = routes;
