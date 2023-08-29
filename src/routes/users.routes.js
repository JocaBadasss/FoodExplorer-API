const { Router } = require("express")
const AppError = require("../utils/AppError")
const UsersController = require("../controllers/UsersController")
const ensureIsAutheticated = require("../middlewares/ensureIsAutheticated")

const userRouter = Router()

const usersController = new UsersController()

userRouter.post("/", usersController.create)
userRouter.get("/", ensureIsAutheticated, usersController.show)

module.exports = userRouter
