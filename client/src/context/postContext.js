import { useState, createContext, useContext, useEffect } from "react"
import { getPostsRequests, createPostRequest, deletePostRequest, getPostRequest, updatePostRequest } from "../api/posts"


const postContext = createContext()

export const usePosts = () => {
    const context = useContext(postContext)
    return context
}

export const PostProvider = ({ children }) => {

    const [posts, setPosts] = useState([])

    // Get All posts 
    const getPosts = async () => {
        const res = await getPostsRequests()
        setPosts(res.data)
    }

    // Get One Post
    const getPost = async (id) => {
        const res = await getPostRequest(id)
        return res.data
    }

    // Update Post
    const updatePost = async (id, post) => {
        try {
            const res = await updatePostRequest(id, post)
            setPosts(posts.map((post) => (post._id === id ? res.data : post)))
        } catch (error) {
            console.log(error)
        }
    }

    // Create post
    const createPost = async (post) => {
        try {
            const res = await createPostRequest(post)
            setPosts([...posts, res.data])
        } catch (error) {
            console.log(error)
        }
    }

    // Delele post
    const deletePost = async (id) => {
        try {
            const res = await deletePostRequest(id)
            setPosts(posts.filter((post) => post._id !== id))
        } catch (error) {
            console.log(error)
        }
        
    }

    useEffect(() => {
        getPosts()
    }, [])

    return <postContext.Provider value={{ posts, getPosts, createPost, deletePost, getPost, updatePost }}>
        {children}
    </postContext.Provider>
}