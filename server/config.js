import dotenv from 'dotenv'
dotenv.config()

export const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/testdb"
export const PORT = process.env.PORT || 3000

//CLOUDINARY_CONFIG 
export const  cloud_name = process.env.cloud_name
export const  api_key = process.env.api_key
export const  api_secret = process.env.api_secret
