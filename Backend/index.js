import express from "express"
import dotenv from "dotenv"

dotenv.config()

const app = express()

const port = process.env.PORT || 4000

app.get('/', (req, res) => {
    res.send("Hello World!")
})

app.listen(port, (req,res) => {
    console.log(`Server is listening at port ${port}`)
})