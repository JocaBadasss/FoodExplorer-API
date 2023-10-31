require("express-async-errors")
require("dotenv/config")
const cookieParser = require("cookie-parser")

const cors = require("cors")
const express = require("express")
const routes = require("./routes")

const uploadConfig = require("./configs/upload")

const AppError = require("./utils/AppError")
const migrateAndCreateMaster = require("./utils/MigrateAndCreateMaster")
const database = require("./database/sqlite")

const app = express()

app.use(express.json())
app.use(cors())

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER))

app.use(routes)

database()

migrateAndCreateMaster()

app.use((err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    })
  }

  console.error(err)

  return res.status(500).json({
    status: "error",
    message: "Internal server error",
  })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
