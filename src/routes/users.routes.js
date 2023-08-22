const { Router } = require("express")
const AppError = require("../utils/AppError")
const UsersController = require("../controllers/UsersController")

const userRouter = Router()

const usersController = new UsersController()

userRouter.post("/", usersController.create)

module.exports = userRouter
