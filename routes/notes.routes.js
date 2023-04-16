const Router = require('express')
const NotesRouter = new Router()
const NotesController = require('../controller/notes.controller')

NotesRouter.post('/notes', NotesController.createItem)
NotesRouter.get('/notes', NotesController.getItems)
NotesRouter.get('/notes/:id', NotesController.getOneItem)
NotesRouter.put('/notes', NotesController.updateItem)
NotesRouter.delete('/notes/:id', NotesController.deleteItem)



module.exports = NotesRouter