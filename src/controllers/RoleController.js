const roleModel = require("../models/RoleModel")

const getAllRoles = async (req,res) =>{

    const roles = await roleModel.find()

    res.json({
        message:"role fetched succesfully",
        data :roles
    })
}

module.exports ={
    getAllRoles
}