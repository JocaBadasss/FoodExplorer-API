const AppError = require("../../utils/AppError")
const dishesUpdateValidationSchema = require("../../schemas/DishesValidations/DishesUpdateServiceValidation")

class DishesUpdateService {
  constructor(DishesRepository) {
    this.dishesRepository = DishesRepository
  }

  async execute({
    id,
    name,
    description,
    price_cents,
    tags,
    category,
    user_id,
  }) {
    try {
      await dishesUpdateValidationSchema.validate(
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
      const findDishByDishId = await this.dishesRepository.findDishByDishId(id)

      if (!findDishByDishId) {
        throw new AppError("Prato não encontrado", 404)
      }

      const newPrice = Number(price_cents.replace(",", ".")) * 100

      await this.dishesRepository.updateDish({
        id,
        name,
        description,
        price_cents: newPrice,
        category,
      })

      const tagsToInsert = tags.map((tag) => {
        return {
          name: tag,
          user_id,
          dish_id: id,
        }
      })

      await this.dishesRepository.updateTags({
        tagsToInsert,
        dish_id: id,
        user_id,
      })

      const updatedDish =
        await this.dishesRepository.findUpdatedDishAndTagsById(id)

      const groupedTags = updatedDish.map((dish) => {
        return {
          id: dish.tag_id,
          name: dish.tag,
        }
      })

      const result = {
        id: updatedDish[0].id,
        name: updatedDish[0].name,
        category: updatedDish[0].category,
        description: updatedDish[0].description,
        price_cents: updatedDish[0].price_cents,
        tags: groupedTags,
      }

      return result
    } catch (error) {
      throw new AppError(error.message, 400)
    }
  }
}

module.exports = DishesUpdateService
