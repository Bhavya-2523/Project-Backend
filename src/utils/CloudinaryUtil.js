const cloudinary = require("cloudinary").v2;



const uploadFileToCloudinary = async(file)=>{
    cloudinary.config({
       cloud_name:"dvax67pwr",
       api_key:"174728921386259",
       api_secret:"QOEDh4g-hj0jpdSfz_Bt75sqoME"
    })

    if (!file || !file.path) {
        throw new Error("File is missing or invalid.");
    }
    return await cloudinary.uploader.upload(file.path);

};

module.exports = {
    uploadFileToCloudinary
}