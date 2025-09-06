import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { User } from "../models/user.model.js";
import { registerValidation } from "../validators/user.validators.js";

const accessAndRefreshToken = async (UserId)=>{
    try {   
        const user = await User.findById(UserId)
        const accessToken = user.generateAccessToken()
        const refreshToken=  user.generateRefreshToken()

        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave: false});

        return {accessToken, refreshToken};
    } catch (error) {
        throw new ApiError(500,"Token: Something went worng")
    }
}

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

const loginUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  if (!(username || email)) {
    throw new ApiError(400, "Enter username or email");
  }

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const { accessToken, refreshToken } = await accessAndRefreshToken(user._id);

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged in successfully"
      )
    );
});

const logoutUser = asyncHandler(async(req,res)=>{
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new : true
        }
    )
    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(new ApiResponse(200,{},"User Logged Out"))
})


export {registerUser, loginUser, logoutUser}