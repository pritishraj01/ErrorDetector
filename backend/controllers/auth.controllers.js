import uploadOnCloudinary from "../config/cloudinary.js"
import generateToken from "../config/token.js"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"

export const signup = async (req, res) => {
    try {
        let { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Fill all the details" })
        }

        let existUser = await User.findOne({ email })
        if (existUser) {
            return res.status(400).json({ message: "User already exist" })
        }

        const hashPass = await bcrypt.hash(password, 10)

        let avatar
        if(req.file){
            avatar= await uploadOnCloudinary(req.file.path)
        }

        let user = await User.create({
            name,
            email,
            password: hashPass,
            avatar
        })

        const token = generateToken(user._id)
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 365 * 24 * 60 * 60 * 1000
        })

        return res.status(201).json({ message: "User created successfully" })
    } catch (error) {
        console.log(`signup error: ${error}`)
    }
}

export const login = async (req, res) => {
    try {
        let { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ message: "Fill all the details" })
        }

        let existUser = await User.findOne({ email })
        if (!existUser) {
            return res.status(400).json({ message: "User not exist" })
        }

        const matchPass =await bcrypt.compare(password, existUser.password)

        if (!matchPass) {
            return res.status(400).json({ message: "Password not matched" })
        }
        const token = generateToken(existUser._id)
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 365 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json({ message: "login successfully" })
    } catch (error) {
        console.log(`login error: ${error}`)
    }
}

export const logout = async (req, res) => {
    try {
     res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
    })
    
    return res.status(200).json({message:"Logout successfully"})
    } catch (error) {
      console.log(`logout error: ${error}`)  
    }
}

export const getCurrentUser= async(req,res)=>{
    try {
        let userId= req.userId

        if(!userId){
            return res.status(400).json({message:"User is not authenticated"})
        }

        let user= await User.findById(userId)
        if(!user){
            return res.status(400).json({message:"User not exist"})
        }

        return res.status(200).json(user)

    } catch (error) {
        console.log(`getme error: ${error}`)
    }
}