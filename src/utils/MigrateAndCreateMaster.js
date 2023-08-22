const knex = require("../database/knex")
const masterCreate = require("../master")

async function migrateDatabase() {
  try {
    await knex.migrate.latest()
  } catch (e) {
    console.error(e)
  }
}

async function MigrateAndCreateMaster() {
  await migrateDatabase()
  await masterCreate()
}

module.exports = MigrateAndCreateMaster
