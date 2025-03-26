const routes = require("express").Router();
const questionController = require("../controllers/QuestionController");

routes.get("/questions", questionController.getAllQuestions);

routes.get("/questionsBySurveyId/:surveyId", questionController.getQuestionsBySurveyId);

routes.post("/questions", questionController.addQuestion);

routes.put("/questions/:id", questionController.updateQuestion);

routes.delete("/questions/:id", questionController.deleteQuestion);

routes.get("/questions/:id", questionController.getQuestionById);

module.exports = routes;
