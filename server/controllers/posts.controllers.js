import Post from '../models/Post.js'
import { uploadImage, deleteImage, updateImage } from '../libs/cloudinary.js'
import fs from 'fs-extra'


// GET ALL POSTS
export const getAllPosts = async (req, res) => {
    try {
        //throw new Error('My new error !!!')
        const posts = await Post.find()
        res.send(posts)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}


// CREATE A POST
export const createPost = async (req, res) => {
    try {
        const { title, description } = req.body
        let image;

        if (req.files?.image) {

            const result = await uploadImage(req.files.image.tempFilePath)
            await fs.remove(req.files.image.tempFilePath)

            image = {
                url: result.secure_url,
                public_id: result.public_id
            }
        }

        const newPost = new Post({ title, description, image })
        await newPost.save()
        return res.json(newPost)

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}


// UPDATE A POST
export const updatePost = async (req, res) => {
 
    const { title, description } = req.body
    let image

    try {
        const post = await Post.findById(req.params.id)
        const public_id = post.image.public_id
        
        if (req.files?.image) {

            const result = await updateImage(req.files.image.tempFilePath, public_id)
            await fs.remove(req.files.image.tempFilePath)

            image = {
                url: result.secure_url,
                public_id: result.public_id
            }
        }
        
        post.title = title
        post.description = description
        post.image = image

        const updatedPost = await Post.findByIdAndUpdate(req.params.id, post, { new: true })
        return res.send(updatedPost)

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

}

// DELETE A POST
export const deletePost = async (req, res) => {
    try {
        const postRemove = await Post.findByIdAndDelete(req.params.id)
        if (!postRemove) return res.sendStatus(404)

        if (postRemove.image.public_id) {
            await deleteImage(postRemove.image.public_id)
        }
        console.log('post deleted')
        return res.status(204).json({ message: 'post deleted' })

    } catch (error) {
        return res.status(500)
    }
}

// GET A POST
export const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) return res.sendStatus(404)
        return res.json(post)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
