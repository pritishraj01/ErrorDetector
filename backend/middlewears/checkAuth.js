import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

const checkAuth=async(req,res,next)=>{
    try {
        let token= req.cookies.token

        let decoded= jwt.verify(token,process.env.JWT_SECRET)
        req.userId= decoded.id
        next()
    } catch (error) {
        console.log(`checkAuth error: ${error}`)
    }
}

export default checkAuth