import express from "express"
import fileUpload from "express-fileupload"
import postsRoutes from './routes/posts.routes.js'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const app = express()
const __dirname = dirname(fileURLToPath(import.meta.url))

// middlewares
app.use(express.json())
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: 'server/upload'
}))

// routes
//app.get('/', (req, res) => { res.send('API Works!') })
app.use(postsRoutes)

// statics files
console.log(__dirname)
app.use(express.static(join(__dirname, '../client/build')))

export default app