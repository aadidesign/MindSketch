import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import userRouter from './routes/userRoutes.js'

const PORT = process.env.PORT || 4000
const app = express()

await connectDB()

app.use(express.json())
app.use(cors())

app.use('/api/users', userRouter)
app.get('/', (req, res) => res.send('API is Working'))
app.listen(PORT, ()=> console.log('Server is running on port ' + PORT));


// By using nodemon, the server will automatically restart when changes are made to the code
// while using nodemon server stop the regular server start command. To see changes just refresh the browser manually.
// We set nodemon command : npm run server


// localhost:4000/api/users/register
// localhost:4000/api/users/login 