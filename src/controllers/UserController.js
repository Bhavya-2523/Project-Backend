const userModel = require("../models/UserModel")
const bcrypt = require("bcrypt")

//---------------------------------------------------

const loginUser = async (req, res) => {
   
    const email = req.body.email;
    const password = req.body.password;
    
    //const foundUserFromEmail = userModel.findOne({email:req.body.email})
    const foundUserFromEmail = await userModel.findOne({ email: email }).populate("roleId");
    console.log(foundUserFromEmail);
    
    if (foundUserFromEmail != null) {
      //password
      //normal -plain req.bodyy --- databse -->match  --> true | false
      //const isMatch = bcrypt.compareSync(req.body.password,foundUserFromEmail.password)
      const isMatch = bcrypt.compareSync( password , foundUserFromEmail.password);
      //true | false
        if (isMatch == true) {
            res.status(200).json({
            message: "login success",
            data: foundUserFromEmail,
            });
        } else {
            res.status(400).json({
            message: "please enter a valid password",
            });
        }
        }
    else {
        res.status(404).json({
        message: "Email not found..",
      });
    }
  };

  
//---------------------------------------------------

const getAllUsers = async (req,res) =>{
    const users = await userModel.find().populate("roleId")
    
    res.json({
        message:"Users fetched successfully",
        data: users
    })
}

// const getAllUsers1 = async (req,res)=>{
//     try{
//         const users = await userModel.find().populate("roleId")
//         res.status(200).json({
//             message:"Users fetched successfully",
//             data:users
//         })
//     }catch(err){
//         res.status(500).json({
//         message:"error",
//         data:err
//         })

//     }
// }
//-------------------------------------------------

const signup = async (req,res)=>{
    try{
        //password encrypt..
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password,salt);
        req.body.password = hashedPassword;
        const createdUser = await userModel.create(req.body);
        res.status(201).json({
            message: "user created..",
            data: createdUser,
        })
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            message: "error",
            data: err,
        })
    }
}

//-------------------------------------------------------

const addUser = async (req,res)=>{
    const savedUser = await userModel.create(req.body)
    res.json({
        message:"User created...",
        data:savedUser
    })
}

// const addUser1 = async (req,res)=>{
//     try{
//         const createdUser = await userModel.create(req.body)
//         res.status(201).json({
//             message:"user created..",
//             data:createdUser
//         })
//     }
//     catch(err){
//         res.status(500).json({
//         message:"error",
//         data:err
//         })

//     }
// }

const deleteUser = async (req,res)=>{
    const deletedUser =await userModel.findByIdAndDelete(req.params.id)
    res.json({
        message:"User deleted successfully",
        data:deletedUser
    })
}

// const deleteUser1 = async (req,res)=>{
//     try{
//         const deletedUser = await userModel.findByIdAndDelete(req.params.id)
//         res.status(204).json({
//             message:"User deleted successfully",
//             data:deletedUser
//         })
//     }catch(err){

//         res.status(500).json({
//             message:"error",
//             data:err
//         })

//     }
// }

const getUserById = async(req,res)=>{
    const foundUser = await userModel.findById(req.params.id)

    res.json({
        message:"User fetched...",
        data:foundUser})
}

// const getUserById1 =async (req,res)=>{
//     try{
//         const foundUser = await userModel.findById(req.params.id)

//     res.status(200).json({
//         message:"User fetched...",
//         data:foundUser})
//     }
//     catch{
//         res.status(500).json({
//             message:"error",
//             data:err
//         })  
//     }
// }

module.exports = {
    getAllUsers,addUser,deleteUser,getUserById,signup,loginUser
    // getAllUsers1,addUser1,deleteUser1,getUserById1,

}