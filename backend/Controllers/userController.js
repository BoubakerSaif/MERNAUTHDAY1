import asyncHandler from "express-async-handler";
import User from "../Model/userModel.js";
import generateToken from "../Utils/generateToken.js";
// @desc Register new User
// route POST /api/users
// @access Public

const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, age, photo, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    age,
    photo,
    password,
  });
  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      age: user.age,
      photo: user.photo,
    });
  } else {
    throw new Error("Invalid user Data");
  }
});

// @desc Auth new User
// route POST /api/users/auth
// @access Public

const authUser = asyncHandler(async (req, res) => {
  res.send("Auth User");
});

// @desc Auth new User
// route POST /api/users/auth
// @access Public

const logoutUser = asyncHandler(async (req, res) => {
  res.send("Logout User");
});

export { registerUser, authUser, logoutUser };
