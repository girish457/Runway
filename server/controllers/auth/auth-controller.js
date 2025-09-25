const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

//register
const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (checkUser)
      return res.json({
        success: false,
        message: "User Already exists with the same email! Please try again",
      });

    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      userName,
      email,
      password: hashPassword,
    });

    await newUser.save();
    res.status(200).json({
      success: true,
      message: "Registration successful",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

//login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt:", { email, password });

  try {
    let userDoc = await User.findOne({ email });
    console.log("User found in DB:", userDoc);

    // Special handling for admin user - ensure proper authentication
    if (email === "admin12@gmail.com") {
      console.log("Admin login attempt detected");
      
      // Ensure admin user exists
      if (!userDoc) {
        console.log("Creating admin user");
        const hashed = await bcrypt.hash(password, 12);
        userDoc = await User.create({
          userName: "Admin",
          email,
          password: hashed,
          role: "admin",
        });
      } else {
        // Ensure the user has admin role
        if (userDoc.role !== "admin") {
          console.log("Updating user to admin role");
          userDoc.role = "admin";
          await userDoc.save();
        }
      }
      
      // Verify password for admin as well
      const checkPasswordMatch = await bcrypt.compare(password, userDoc.password);
      if (!checkPasswordMatch) {
        return res.json({
          success: false,
          message: "Incorrect password! Please try again",
        });
      }
      
      // Create token with actual user data
      const token = jwt.sign(
        {
          id: userDoc._id,
          role: userDoc.role,
          email: userDoc.email,
          userName: userDoc.userName,
        },
        process.env.JWT_SECRET || "dev_jwt_secret",
        { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
      );

      const responseUser = {
        id: userDoc._id,
        userName: userDoc.userName,
        email: userDoc.email,
        role: userDoc.role,
      };

      console.log("Admin login successful, setting cookie");
      res
        .cookie("token", token, { 
          httpOnly: true, 
          secure: false,
          sameSite: 'lax',
          maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        })
        .json({
          success: true,
          message: "Logged in successfully",
          token,
          user: responseUser,
        });
      return;
    }

    // Regular user login
    if (!userDoc) {
      return res.json({
        success: false,
        message: "User doesn't exists! Please register first",
      });
    }

    const checkPasswordMatch = await bcrypt.compare(password, userDoc.password);
    if (!checkPasswordMatch) {
      return res.json({
        success: false,
        message: "Incorrect password! Please try again",
      });
    }

    const token = jwt.sign(
      {
        id: userDoc._id,
        role: userDoc.role,
        email: userDoc.email,
        userName: userDoc.userName,
      },
      process.env.JWT_SECRET || "dev_jwt_secret",
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );

    const responseUser = {
      id: userDoc._id,
      userName: userDoc.userName,
      email: userDoc.email,
      role: userDoc.role,
    };

    console.log("Regular user login successful, setting cookie");
    res
      .cookie("token", token, { 
        httpOnly: true, 
        secure: false,
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
      })
      .json({
        success: true,
        message: "Logged in successfully",
        token,
        user: responseUser,
      });
  } catch (e) {
    console.log("Login error:", e);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

//logout
const logoutUser = (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logged out successfully!",
  });
};

//auth middleware
const authMiddleware = async (req, res, next) => {
  console.log("Auth middleware called");
  console.log("Cookies:", req.cookies);
  const token = req.cookies.token;
  if (!token) {
    console.log("No token found in cookies");
    return res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });
  }

  try {
    console.log("Verifying token:", token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "dev_jwt_secret");
    console.log("Token decoded:", decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.log("Token verification error:", error);
    res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });
  }
};

// Check auth controller
const checkAuth = async (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    message: "Authenticated user!",
    user,
  });
};

// Special admin login function (deprecated - using regular login now)
const adminLogin = async (req, res) => {
  // Redirect to regular login
  return loginUser(req, res);
};

module.exports = { registerUser, loginUser, logoutUser, authMiddleware, checkAuth, adminLogin };