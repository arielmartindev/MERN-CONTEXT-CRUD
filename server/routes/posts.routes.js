import { Router } from "express"
import { getAllPosts, createPost, updatePost, deletePost, getPost } from '../controllers/posts.controllers.js'

const router = Router()


// GET ALL POST
router.get('/posts', getAllPosts)

// CREATE A POST
router.post('/posts', createPost)

// UPDATE A POST
router.put('/posts/:id', updatePost)

// DELETE A POST
router.delete('/posts/:id', deletePost)

// GET ONE POST
router.get('/posts/:id', getPost)

export default router