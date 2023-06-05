const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())

const userRouter = require('./routes/user.routes')
const postRouter = require('./routes/post.routes')

const PORT = process.env.PORT || 8080
app.use(express.json())

app.use('/api', userRouter)
app.use('/api', postRouter)

// Start the server
app.listen(PORT, () => {
  	console.log(`Server is running on http://localhost:${PORT}`)
})