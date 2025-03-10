const express = require ("express")
const mongoose = require ("mongoose")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

const roleRoutes = require ("./src/routes/RoleRoutes")
app.use(roleRoutes)

const userRoutes = require ("./src/routes/UserRoutes")
app.use(userRoutes)

const categoryRoutes = require ("./src/routes/CategoryRoutes")
app.use("/category",categoryRoutes)

const surveyRoutes = require ("./src/routes/SurveyRoutes")
app.use("/survey",surveyRoutes)

mongoose.connect("mongodb://127.0.0.1:27017/25_node_internship").then(()=>{
    console.log("database connected....")
})

const PORT = 3000
app.listen(PORT,()=>{
    console.log("server started on port number ",PORT)
})