const { Router } = require("express")
const ensureIsMaster = require("../middlewares/ensureIsMaster")
const AdminControllers = require("../controllers/AdminControllers")

const adminRouter = Router()
const adminControllers = new AdminControllers()

adminRouter.post("/", ensureIsMaster, adminControllers.create)

module.exports = adminRouter
