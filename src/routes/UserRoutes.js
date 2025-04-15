const routes = require("express").Router();
const userController = require("../controllers/UserController");

routes.get("/users", userController.getAllUsers);
routes.post("/user", userController.signup);
routes.delete("/user/:id", userController.deleteUser);
routes.get("/user/:id", userController.getUserById);
routes.post("/user/login", userController.loginUser);
routes.post("/user/loginWithToken", userController.loginuserWithToken);
routes.post("/user/forgotpassword", userController.forgotPassword);
routes.post("/user/resetpassword", userController.resetpassword);
routes.put("/user/:id", userController.updateUser);

module.exports = routes;