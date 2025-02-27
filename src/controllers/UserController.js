const userModel = require("../models/UserModel")

const getAllUsers = async (req,res) =>{
    const users = await userModel.find()

    res.json({
        message:"Users fetched successfully",
        data: users
    })
}

const addUser = async (req,res)=>{
    const savedUser = await userModel.create(req.body)
    res.json({
        message:"User created...",
        data:savedUser
    })
}

const deleteUser = async (req,res)=>{
    const deletedUser =await userModel.findByIdAndDelete(req.params.id)
    res.json({
        message:"User deleted successfully",
        data:deletedUser
    })
}

const getUserById = async(req,res)=>{
    const foundUser = await userModel.findById(req.params.id)

    res.json({
        message:"User fetched...",
        data:foundUser})
}

module.exports = {
    getAllUsers,addUser,deleteUser,getUserById
}