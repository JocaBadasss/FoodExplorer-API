const AppError = require("../../utils/AppError")
const dishesCreateValidationSchema = require("../../schemas/DishesValidations/DishesCreateServiceValidation")

class DishesCreateServices {
  constructor(dishesRepository) {
    this.dishesRepository = dishesRepository
  }

  async execute({ name, category, description, price_cents, tags, user_id }) {
    try {
      await dishesCreateValidationSchema.validate(
        { name, category, description, price_cents, tags },
        {
          abortEarly: false,
        }
      )
    } catch (error) {
      const formattedErrors = error.inner.map((err) => err.message).join(", ")
      throw new AppError(`Erro de validação: ${formattedErrors}`, 400)
    }

    try {
      const newPrice = Number(price_cents.replace(",", ".") * 100)

      const dishNameAlreadyExists =
        await this.dishesRepository.verifyIfDishNameAlreadyExists(name)

      if (dishNameAlreadyExists.length > 0) {
        throw new AppError("Prato já existe", 400)
      }

      const dish_id = await this.dishesRepository.createDish({
        name,
        category,
        description,
        price_cents: newPrice,
        user_id,
      })

      const tagsToInsert = tags.map((tag) => {
        return {
          name: tag,
          dish_id,
          user_id,
        }
      })

      await this.dishesRepository.createTags(tagsToInsert)

      return dish_id
    } catch (error) {
      throw new AppError(error.message, 400)
    }
  }
}

module.exports = DishesCreateServices
