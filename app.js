const express = require ("express")
const mongoose = require ("mongoose")

const app = express()

const roleRoutes = require ("./src/routes/RoleRoutes")
app.use(roleRoutes)

mongoose.connect("mongodb://127.0.0.1:27017/25_node_internship").then(()=>{
    console.log("database connected....")
})

const PORT = 3000
app.listen(PORT,()=>{
    console.log("server started on port number ",PORT)
})