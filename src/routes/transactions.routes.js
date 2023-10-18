const { Router } = require("express")
const AppError = require("../utils/AppError")
const TransactionsControllers = require("../controllers/TransactionsControllers")
const ensureIsAutheticated = require("../middlewares/ensureIsAutheticated")

const transactionsControllers = new TransactionsControllers()

const transactionsRouter = Router()

transactionsRouter.post(
  "/",
  ensureIsAutheticated,
  transactionsControllers.create
)

module.exports = transactionsRouter
