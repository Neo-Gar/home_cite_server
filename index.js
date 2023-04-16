const express = require("express")
const FoodRouter = require("./routes/food.routes")
const NotesRouter = require('./routes/notes.routes')
const {json} = require("express");

const PORT = 3010

const app = express()

app.use(express.json())
app.use('/api', FoodRouter)
app.use('/api', NotesRouter)

app.listen(
    PORT,
    () => console.log(`Server started on port ${PORT}`)
)