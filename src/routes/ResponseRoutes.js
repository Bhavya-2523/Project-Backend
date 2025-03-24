const express = require("express");
const router = express.Router();
const responseController = require("../controllers/ResponseController");

router.post("/", responseController.submitResponse);
router.get("/:surveyId", responseController.getResponsesBySurvey);
router.get("/details/:responseId", responseController.getResponseById);
router.delete("/:responseId", responseController.deleteResponse);

module.exports = router;
