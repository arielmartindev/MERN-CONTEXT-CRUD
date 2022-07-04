import cloudinary from 'cloudinary'
import {cloud_name, api_key, api_secret} from '../config.js'

cloudinary.config({
    cloud_name: cloud_name,
    api_key: api_key,
    api_secret: api_secret

})

export const uploadImage = async (filePath) => {
    return await cloudinary.v2.uploader.upload(filePath, {
        folder: 'posts'
    })
}


export const updateImage = async (filePath, public_id) => {
    return await cloudinary.v2.uploader.upload(filePath, {
        public_id: public_id
    })
}


export const deleteImage = async id => {
    return await cloudinary.uploader.destroy(id)
}