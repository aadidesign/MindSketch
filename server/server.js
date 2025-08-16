import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import userRouter from './routes/userRoutes.js'
import imageRouter from './routes/imageRoutes.js'
import billingRouter from './routes/billingRoutes.js'

const PORT = process.env.PORT || 4000
const app = express()

await connectDB()

// For Stripe webhooks: need raw body on /api/billing/webhook
app.use((req, res, next) => {
  if (req.originalUrl === '/api/billing/webhook') {
    express.raw({ type: 'application/json' })(req, res, next)
  } else {
    express.json()(req, res, next)
  }
})
app.use(cors())

app.use('/api/users', userRouter)
app.use('/api/image', imageRouter)
app.use('/api/billing', billingRouter)
app.get('/', (req, res) => res.send('API is Working'))
app.listen(PORT, ()=> console.log('Server is running on port ' + PORT));


// By using nodemon, the server will automatically restart when changes are made to the code
// while using nodemon server stop the regular server start command. To see changes just refresh the browser manually.
// We set nodemon command : npm run server


// localhost:4000/api/users/register
// localhost:4000/api/users/login 