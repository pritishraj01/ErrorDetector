import { v2 as cloudinary } from "cloudinary"
import fs from "fs"
import dotenv from "dotenv"
dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_APIKEY,
    api_secret: process.env.CLOUDINARY_APISECRET,
})

const uploadOnCloudinary = async (filePath) => {
    try {
        if (!filePath) return null
        let upload = await cloudinary.uploader.upload(filePath, { resource_type: "auto" });
        console.log(upload)
        fs.unlinkSync(filePath)
        return upload.secure_url
    } catch (error) {
        fs.unlinkSync(filePath)
        console.log(`cloudinary error: ${error}`)
    }
}

export default uploadOnCloudinary