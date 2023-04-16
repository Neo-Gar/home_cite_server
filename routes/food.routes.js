const Router = require('express')
const FoodRouter = new Router()
const FoodController = require('../controller/food.controller')

FoodRouter.post('/food', FoodController.createItem)
FoodRouter.get('/food', FoodController.getItems)
FoodRouter.get('/food/:id', FoodController.getOneItem)
FoodRouter.put('/food', FoodController.updateItem)
FoodRouter.delete('/food/:id', FoodController.deleteItem)



module.exports = FoodRouter