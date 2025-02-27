const roleModel = require("../models/RoleModel")

const getAllRoles = async (req,res) =>{

    const roles = await roleModel.find()

    res.json({
        message:"role fetched succesfully",
        data :roles
    })
}

const addRole = async (req,res) => {
    //req.body,req.params,req.headers,req.query
    //console.log("request body....", req.body);
    //insert into roles () values()
    //database...

    const savedRole = await roleModel.create(req.body)
    res.json({
        message:"role created...",
        data:savedRole
    })
}

const deleteRole = async(req,res) =>{
    //delete from roles where id =?
    //req.params
    //    console.log(req.params.id) //prams object...
    const deletedRole = await roleModel.findByIdAndDelete(req.params.id)
    res.json({
        message:"role deleted successfully",
        data:deletedRole
    })
    }

const getRoleById = async(req,res)=>{
    const foundRole = await roleModel.findById(req.params.id)

    res.json({
        message:"role fetched...",
        data:foundRole
    })
}


module.exports ={
    getAllRoles,addRole,deleteRole,getRoleById
}