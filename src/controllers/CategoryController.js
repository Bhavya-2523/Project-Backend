const categoryModel = require("../models/CategoryModel")

const getAllCategories = async (req,res)=>{
    const categories = await categoryModel.find()

    res.json({
        message:"Category fetched succesfully",
        data :categories
    })
}

const addCategory = async (req,res) => {

    const savedCategory = await categoryModel.create(req.body)
    res.json({
        message:"Category created...",
        data:savedCategory
    })
}

const deleteCategory = async(req,res) =>{
    
    const deletedCategory = await categoryModel.findByIdAndDelete(req.params.id)
    res.json({
        message:"Category deleted successfully",
        data:deletedCategory
    })
}

const getCategoryById = async(req,res)=>{
    const foundCategory = await categoryModel.findById(req.params.id)

    res.json({
        message:"role fetched...",
        data:foundCategory
    })
}

module.exports ={
    getAllCategories,addCategory,deleteCategory,getCategoryById
}