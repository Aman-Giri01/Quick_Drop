// Auth controller
import userModel from "../../models/user.model.js";
import expressAsyncHandler from "express-async-handler";
import ApiResponse from "../../utils/ApiResponse.util.js";
import CustomError from "../../utils/customError.util.js";
import { generateToken } from "../../utils/jwt.util.js";

// ! ================ Register User ================================

export const registerUser = expressAsyncHandler(async (req, res, next) => {
    const {name,email,password,phone}=req.body;

    const newUser= await userModel.create({
        name,
        email,
        password,
        phone
    });

    await newUser.save();
    new ApiResponse(200,"User Registered Successfully",newUser).send(res);


});

// ! --------------------------------------------------------------

// ! ================== Login =====================================

export const login = expressAsyncHandler(async (req, res, next) => {
    const {email,password}=req.body;
    let existingUser=await userModel.findOne({email}).select("+password");
    if(!existingUser){
        return next(new CustomError(404,"Invalid Credentials"));
    }
    let isPasswordMatched=await existingUser.comparePassword(password);
    if(!isPasswordMatched){
        return next(new CustomError(401,"Invalid Credentials"))
    }

    let token=generateToken(existingUser.id);
    res.cookie("token",token,{
        maxAge:1*60*60*1000,
        httpOnly:true,
        secure:true,
        sameSite:"none"
    });

    new ApiResponse(200,"User Logged in successfully").send(res);
    
});

// ! ----------------------------------------------------------

// ! ======================== Logout ==================================

export const logout = expressAsyncHandler(async (req, res, next) => {
    res.clearCookie("token");
    new ApiResponse(200,"User Logged out successfully").send(res);
});

// !------------------------------------------------------------------

// ! ====================== Update Profile ===========================

export const updateProfile = expressAsyncHandler(async (req, res, next) => {});

// !-------------------------------------------------------------------
