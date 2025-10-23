const express = require("express");
const userRouter = express.Router();
const { validateUserData, validateLogInData } = require("../utils/helper")
const UserModel = require("../model/user")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "VINAY_SECRET_KEY";
userRouter.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        validateUserData(req);
        const isEmailExist = await UserModel.findOne({ email });
        if (isEmailExist) {
            throw new Error("email already exists")
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        await UserModel.insertOne({ name, email, password: hashedPassword });


        res.status(201).json(req.body)

    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

userRouter.post("/login", async (req, res) => {
    try {

        validateLogInData(req);
        const { email, password } = req.body;
        const existitingUser = await UserModel.findOne({ email }); // email,password
        if (!existitingUser) {
            throw new Error("User Not Found");
        }
        const isValidPassword = await bcrypt.compare(req.body.password, existitingUser.password);
        if (!isValidPassword) {
            throw new Error("Invalid Credentails");
        }
        const token = jwt.sign({ _id: existitingUser._id }, SECRET_KEY, { expiresIn: "1h" });  
        res.cookie("token", token, 
            {   httpOnly: true, //only acessed via httpOnly we didnt acess in developer console also
                secure: true,         // only on HTTPS
                sameSite: "strict",
                maxAge: 60 * 60 * 1000
            })
        return res.status(200).json(existitingUser);

    } catch (err) {
        res.status(400).json({ message: err.message })

    }
}) 
 
module.exports = userRouter;