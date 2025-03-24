const routes = require("express").Router();
const questionController = require("../controllers/QuestionController");

// ✅ Get all questions
routes.get("/questions", questionController.getAllQuestions);

// ✅ Get questions by Survey ID
routes.get("/questionsBySurveyId/:surveyId", questionController.getQuestionsBySurveyId);

// ✅ Add a new question
routes.post("/questions", questionController.addQuestion);

// ✅ Update an existing question
routes.put("/questions/:id", questionController.updateQuestion);

// ✅ Delete a question
routes.delete("/questions/:id", questionController.deleteQuestion);

// ✅ Get a single question by ID
routes.get("/questions/:id", questionController.getQuestionById);

module.exports = routes;
