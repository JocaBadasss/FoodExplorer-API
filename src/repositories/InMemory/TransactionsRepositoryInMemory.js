const MercadoPagoRepositoryInMemory = require("./MercadoPagoRepositoryInMemory")

class TransactionsRepositoryInMemory {
  dishes = [
    {
      id: 1,
      name: "Prugna Pie",
      category: "Sobremesas",
      description:
        "Torta de ameixa com massa amanteigada, polvilho em cachacça.",
      price_cents: 7997,
    },
    {
      id: 2,
      name: "Apple Crisp",
      category: "Sobremesas",
      description: "Crispy apple dessert with a crumbly topping.",
      price_cents: 8997,
    },
    {
      id: 3,
      name: "Banana Bread",
      category: "Sobremesas",
      description: "Moist banana bread with a touch of cinnamon.",
      price_cents: 7597,
    },
    {
      id: 4,
      name: "Cherry Tart",
      category: "Sobremesas",
      description: "Sweet cherry filling in a flaky pie crust.",
      price_cents: 8497,
    },
    {
      id: 5,
      name: "Peach Cobbler",
      category: "Sobremesas",
      description: "Warm peach cobbler with a biscuit topping.",
      price_cents: 7797,
      image: "",
    },
  ]

  async verifyDishsAmountByIds(dishs) {
    const dishsPrices = await Promise.all(
      dishs.map(async (dish) => {
        const dishPrice = this.dishes.find((d) => d.id === dish.id)

        return dishPrice.price_cents * dish.quantity
      })
    )

    const total = dishsPrices.reduce((a, b) => a + b, 0) / 100

    return total
  }

  async createTransaction(paymentData) {
    const mercadoPagoRepository = new MercadoPagoRepositoryInMemory()

    const response = await mercadoPagoRepository.createPayment(paymentData)


    return response
  }
}

module.exports = TransactionsRepositoryInMemory
