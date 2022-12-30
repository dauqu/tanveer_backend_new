const express = require("express");
const router = express.Router();
const UsersSchema = require("./../models/users_schema");
const JWT = require("jsonwebtoken");

require("dotenv").config();

// //Get Profile
// router.get("/", async (req, res) => {

//     //Check user have token or not
//     const token = req.cookies.auth_token || req.body.token || req.headers["x-auth-token"];
//     // console.log(token);
//     if (token === undefined || token === null || token === "") {
//         return res.status(401).json({ message: "Unauthorized" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     try {
//         const user = await UsersSchema.findOne({ _id: decoded.id });
//         res.status(200).json(user);

//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// code to get user profile
router.get("/", async (req, res) => {
  try {
    let token = req.cookies.token || req.headers["token"];

    if (token != undefined || token != null || token != "") {
      const have_valid_token = JWT.verify(token, process.env.JWT_SECRET);
      const id_from_token = have_valid_token.id;
      const user_data = await UsersSchema.findById(id_from_token);
      res.json({
        message: "You are login",
        status: "success",
        data: user_data,
        // token: token,
      });
    } else {
      res.json({ message: "You are not login ", status: "warning" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
});

router.patch('/', async (req, res) => {
  try {
    // get token 
    const token = req.body.token || req.headers["token"] || req.cookies.token;
    if(!token){
      res.json({message: "Unauthorized", status: "warning"})
    }
    const userdecoded = JWT.verify(token, process.env.JWT_SECRET);
    if(!userdecoded){
      res.json({message: "User not found", status: "warning"})
    }
    const updateUser = await UsersSchema.findByIdAndUpdate(userdecoded.id, req.body);
    updateUser.save();
    return res.json({message: "User profile updated", status: "success"});
  } catch (error) {
    return res.status(400).json({message: error, status: "error"});
  }
})
module.exports = router;
