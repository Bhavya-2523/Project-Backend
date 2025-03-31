const express = require("express");
const responseController = require("../controllers/ResponseController");
const routes = require ("express").Router()

routes.post("/", responseController.submitResponse);
routes.get("/:id", responseController.getResponsesBySurvey);
routes.get("/details/:responseId", responseController.getResponseById);
routes.delete("/:responseId", responseController.deleteResponse);

module.exports = routes;
