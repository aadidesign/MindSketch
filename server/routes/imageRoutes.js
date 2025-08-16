import express from 'express'
import {generateImage} from '../controllers/imageController.js'
import userAuth from '../middlewares/auth.js'

const imageRouter = express.Router ()

imageRouter.post('/generate-image', userAuth, generateImage) //userAuth is the Middleware here. so, added in the middle

export default imageRouter