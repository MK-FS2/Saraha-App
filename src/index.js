import express from "express"
import Bootstrap from "./application.js"
import { AutoDelete } from "./Background/index.js"

const app = express ()
const port = 3000
Bootstrap(app,express)
AutoDelete()

app.listen(port,()=>{console.log(`Server is running on port ${port}`)})