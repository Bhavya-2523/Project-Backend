// const express = require("express");
const routes = require ("express").Router()
const answerController = require("../controllers/AnswerController");


routes.get("/answers/:id", answerController.getAnswersBySurvey);

routes.post("/", answerController.submitAnswer);
routes.get("/:responseId", answerController.getAnswersByResponse);
routes.delete("/:answerId", answerController.deleteAnswer);

module.exports = routes;
