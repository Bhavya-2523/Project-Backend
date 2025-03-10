const routes = require("express").Router();
const categoryController = require("../controllers/CategoryController");

routes.get("/categories", categoryController.getAllCategories);
routes.post("/categories", categoryController.addCategory);
routes.delete("/categories/:id", categoryController.deleteCategory);
routes.get("/categories/:id", categoryController.getCategoryById);

module.exports = routes;
