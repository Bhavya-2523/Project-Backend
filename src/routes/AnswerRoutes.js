// const express = require("express");
const routes = require ("express").Router()
const answerController = require("../controllers/AnswerController");


routes.get("/answers", answerController.getAllAnswers);
routes.get("/answer/:id", answerController.getAnswersBySurvey);

routes.post("/", answerController.submitAnswer);
routes.delete("/:answerId", answerController.deleteAnswer);

module.exports = routes;