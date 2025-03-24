const surveyModel = require("../models/SurveyModel");
const multer = require("multer");
const path = require("path");
const cloudinaryUtil = require("../utils/CloudinaryUtil");

const storage = multer.diskStorage({
    destination: "./uploads",
    filename: function (req, file, cb) {
        cb(null, file.originalname);
      },
})
const upload = multer({
    storage: storage,
    //fileFilter:
  }).single("image");


const getAllSurveys = async (req, res) => {8
    try {
        const surveys = await surveyModel.find().populate("creatorId").populate("categoryId");
        res.json({
            message: "Surveys fetched successfully",
            data: surveys
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching surveys", error: error.message });
    }
};
const getAllSurveysByUserId = async (req, res) => {
    try {
        const surveys = await surveyModel.find({creatorId:req.params.creatorId}).populate("creatorId").populate("categoryId");
        if (surveys.length === 0) {
            res.status(404).json({ message: "No surveys found" });
        }else{
        res.status(200).json({
            message: "Surveys fetched successfully",
            data: surveys
        });
}

    } catch (error) {
        res.status(500).json({ message: "Error fetching surveys", error: error.message });
    }
};

const addSurvey = async (req, res) => {
    try {
        const savedSurvey = await surveyModel.create(req.body);
        res.json({
            message: "Survey created successfully",
            data: savedSurvey
        });
    } catch (error) {
        res.status(500).json({ message: "Error creating survey", error: error.message });
    }
};

const deleteSurvey = async (req, res) => {
    try {
        const deletedSurvey = await surveyModel.findByIdAndDelete(req.params.id);
        if (!deletedSurvey) {
            return res.status(404).json({ message: "Survey not found" });
        }
        res.json({
            message: "Survey deleted successfully",
            data: deletedSurvey
        });
    } catch (error) {
        res.status(500).json({ message: "Error deleting survey", error: error.message });
    }
};

// const getSurveyById = async (req, res) => {
//     try {
//         const foundSurvey = await surveyModel.findById(req.params.id).populate("creatorId").populate("categoryId");
//         if (!foundSurvey) {
//             return res.status(404).json({ message: "Survey not found" });
//         }
//         res.json({
//             message: "Survey fetched successfully",
//             data: foundSurvey
//         });
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching survey", error: error.message });
//     }
// };

const getSurveyById = async (req, res) => {
    try {
        const survey = await surveyModel.findById(req.params.id);
        if (!survey) {
            return res.status(404).json({ message: "Survey not found" });
        }
        res.status(200).json({ data: survey });
    } catch (err) {
        res.status(500).json({ message: "Error fetching survey", error: err });
    }
};

 
const addSurveyWithFile = async (req,res)=>{
    upload(req,res,async(err)=>{
        if(err){
            res.status(500).json({
                message:err.message,
            })
        }else{
            const cloudinaryResponse = await cloudinaryUtil.uploadFileToCloudinary(req.file);
            console.log(cloudinaryResponse);
            console.log(req.body);

            req.body.imageURL = cloudinaryResponse.secure_url
            const savedSurvey = await surveyModel.create(req.body);
             
            res.status(200).json({
                message:"Survey saved succesfully",
                data: savedSurvey
            })
        
        }
    })
};

const updateSurvey = async (req, res) => {
    try {
      const updatedSurvey = await surveyModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
  
      if (!updatedSurvey) {
        return res.status(404).json({
          message: "Survey not found",
        });
      }
  
      res.status(200).json({
        message: "Survey updated successfully",
        data: updatedSurvey,
      });
    } catch (err) {
      res.status(500).json({
        message: "Error while updating survey",
        error: err.message,
      });
    }
  };
  

  

module.exports = {
    getAllSurveys,
    addSurvey,
    deleteSurvey,
    getSurveyById,
    addSurveyWithFile,
    getAllSurveysByUserId,
    updateSurvey
};