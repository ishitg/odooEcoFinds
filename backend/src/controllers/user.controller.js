import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { User } from "../models/user.model.js";
import { registerValidation } from "../validators/user.validators.js";

const registerUser = asyncHandler( async (req,res)=>{
    // algo 
    // get details from frontend 
    // validate those detils 
    // check if user already exists or not - by email
    // check for profile image - if then upload it 
    // upload on cloudinary, check if it is successfully uploaded or not
    // create user object - db
    // remove password and refresh token from response 
    // check if user creation was successfully
    // return response

    const {username, fullname, email, password, address} = req.body

    //validation of user details
     const { error } = registerValidation.validate(req.body, { abortEarly: false });

    if (error) {
        const formattedErrors = error.details.map((err) => ({
            field: err.context?.key,
            message: err.message,
        }));
        throw new ApiError(400, "Validation failed", formattedErrors);
    }

   const existedUser = await User.findOne({ $or: [{ email }, { username }] });

    if(existedUser){
        throw new ApiError(400, "User with username or email already exists");
    }

    let profileImagePath;
    if(req.files && Array.isArray(req.files.profileImage) && req.files.profileImage.length > 0){
        profileImagePath = req.files.profileImage[0].path;
    }

    const profileImage = await uploadOnCloudinary(profileImagePath);

    const user = await User.create({
        fullname : fullname,
        email : email,
        password : password,
        address : address,
        profileImage : profileImage?.url || "",
        username : username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500, "User is not registered")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )
} )

export {registerUser}