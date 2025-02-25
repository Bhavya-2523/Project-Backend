const routes = require ("express").Router()
const rolecontroller = require("../controllers/RoleController")
routes.get("/roles",rolecontroller.getAllRoles)

module.exports = routes