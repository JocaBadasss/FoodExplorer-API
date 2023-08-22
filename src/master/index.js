const Master = require("./controllers/MasterController")

const master = new Master()

async function masterCreate() {
  try {
    await master.create()
  } catch (e) {
    console.error(e)
  }
}

module.exports = masterCreate

