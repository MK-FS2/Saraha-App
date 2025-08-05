import express from "express"
import Bootstrap from "./application.js"

const app = express ()
const port = 3000

Bootstrap(app,express)

app.listen(port,()=>{console.log(`Server is running on port ${port}`)})