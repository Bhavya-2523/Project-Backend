const routes = require ("express").Router()
const rolecontroller = require("../controllers/RoleController")
routes.get("/roles",rolecontroller.getAllRoles)
routes.post("/role",rolecontroller.addRole)
routes.delete("/role/:id",rolecontroller.deleteRole)
routes.get("/role/:id",rolecontroller.getRoleById)

module.exports = routes