import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

const generateToken= (id)=>{
    try {
        let token= jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"365d"})
        return token
    } catch (error) {
        console.log(`generateToken error: ${error}`)
    }
}

export default generateToken