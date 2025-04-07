const userModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const mailUtil = require("../utils/MailUtil");
const jwt = require("jsonwebtoken");
const secret = "secret";

//---------------------------------------------------

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    
    const foundUserFromEmail = await userModel.findOne({ email }).populate("roleId");

    if (foundUserFromEmail) {
        const isMatch = bcrypt.compareSync(password, foundUserFromEmail.password);

        if (isMatch) {
            res.status(200).json({
                message: "Login successful",
                data: foundUserFromEmail,
            });
        } else {
            res.status(400).json({ message: "Invalid password" });
        }
    } else {
        res.status(404).json({ message: "Email not found" });
    }
};

//---------------------------------------------------

const loginuserWithToken = async (req, res) => {
    const { email, password } = req.body;
  
    const foundUserFromEmail = await userModel.findOne({ email });
    if (foundUserFromEmail) {
        const isMatch = bcrypt.compareSync(password, foundUserFromEmail.password);
        if (isMatch) {
            const token = jwt.sign({ id: foundUserFromEmail._id }, secret);
            res.status(200).json({ message: "User logged in", token });
        } else {
            res.status(400).json({ message: "Invalid credentials" });
        }
    } else {
        res.status(404).json({ message: "User not found" });
    }
};

//---------------------------------------------------

const getAllUsers = async (req, res) => {
    const users = await userModel.find().populate("roleId");
    res.json({
        message: "Users fetched successfully",
        data: users,
    });
};

//---------------------------------------------------

const signup = async (req, res) => {
    try {
        const { password, email, phone, ...rest } = req.body;
        
        // Hash password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        
        const createdUser = await userModel.create({
            ...rest,
            email,
            phone: phone.toString(), // Ensure phone is stored as a string
            password: hashedPassword,
        });

        await mailUtil.sendingMail(createdUser.email, "Welcome to SurveySnap", "Welcome to SurveySnap family!");

        res.status(201).json({
            message: "User created",
            data: createdUser,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error", data: err });
    }
};

//---------------------------------------------------

const deleteUser = async (req, res) => {
    const deletedUser = await userModel.findByIdAndDelete(req.params.id);
    res.json({
        message: "User deleted successfully",
        data: deletedUser,
    });
};

//---------------------------------------------------

const getUserById = async (req, res) => {
    const foundUser = await userModel.findById(req.params.id).populate("roleId");
    res.json({
        message: "User fetched",
        data: foundUser,
    });
};

//---------------------------------------------------

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    const foundUser = await userModel.findOne({ email });

    if (foundUser) {
        const token = jwt.sign({ id: foundUser._id }, secret, { expiresIn: "1h" });
        const url = `http://localhost:5173/resetpassword/${token}`;
        const mailContent = `<html><a href="${url}">Reset Password</a></html>`;

        await mailUtil.sendingMail(foundUser.email, "Reset Password", mailContent);
        res.json({ message: "Reset password link sent successfully" });
    } else {
        res.status(404).json({ message: "User not found" });
    }
};

//---------------------------------------------------

const resetpassword = async (req, res) => {
    try {
        const { token, password } = req.body;
        const decoded = jwt.verify(token, secret);

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        await userModel.findByIdAndUpdate(decoded.id, { password: hashedPassword });

        res.json({ message: "Password updated successfully" });
    } catch (err) {
        res.status(400).json({ message: "Invalid or expired token" });
    }
};

const updateUser = async (req, res) => {
  try {
      const { id } = req.params;
      let updateData = { ...req.body };

      // Convert phone to string if present
      if (updateData.phone) {
          updateData.phone = updateData.phone.toString();
      }

      // Hash password if present
      if (updateData.password) {
          const salt = bcrypt.genSaltSync(10);
          updateData.password = bcrypt.hashSync(updateData.password, salt);
      }

      const updatedUser = await userModel.findByIdAndUpdate(
          id,
          updateData,
          { new: true, runValidators: true }
      ).populate("roleId");

      if (!updatedUser) {
          return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({
          message: "User updated successfully",
          data: updatedUser
      });
  } catch (err) {
      res.status(400).json({ 
          message: "Error updating user", 
          error: err.message 
      });
  }
};

module.exports = {
    getAllUsers,
    deleteUser,
    getUserById,
    signup,
    loginUser,
    forgotPassword,
    resetpassword,
    loginuserWithToken,
    updateUser
};
