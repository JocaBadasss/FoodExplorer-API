class OrdersRepositoryInMemory {
  orders = [
    {
      id: 1,
      status: "concluido",
      created_at: "2023-10-25 17:39:54",
    },
    {
      id: 2,
      status: "pendente",
      created_at: "2023-10-25 17:39:54",
    },
    {
      id: 3,
      status: "entregue",
      created_at: "2023-10-25 17:39:54",
    },
  ]

  orders_dishs = [
    {
      id: 1,
      order_id: 1,
      dish_id: 1,
      quantity: 1,
    },
    {
      id: 2,
      order_id: 1,
      dish_id: 2,
      quantity: 2,
    },
    {
      id: 3,
      order_id: 1,
      dish_id: 3,
      quantity: 3,
    },
    {
      id: 4,
      order_id: 2,
      dish_id: 1,
      quantity: 1,
    },
    {
      id: 5,
      order_id: 2,
      dish_id: 2,
      quantity: 2,
    },
    {
      id: 6,
      order_id: 2,
      dish_id: 3,
      quantity: 3,
    },
    {
      id: 7,
      order_id: 3,
      dish_id: 1,
      quantity: 1,
    },
    {
      id: 8,
      order_id: 3,
      dish_id: 2,
      quantity: 2,
    },
    {
      id: 9,
      order_id: 3,
      dish_id: 3,
      quantity: 3,
    },
  ]

  orders_history = [
    {
      id: 1,
      user_id: 1,
      order_id: 1,
      created_at: "2023-10-25 17:39:54",
    },
    {
      id: 2,
      user_id: 1,
      order_id: 2,
      created_at: "2023-10-25 17:39:54",
    },
    {
      id: 1,
      user_id: 1,
      order_id: 3,
      created_at: "2023-10-25 17:39:54",
    },
  ]

  dishs = [
    {
      id: 1,
      name: "Dish 1",
      price_cents: 1000,
      created_at: "2023-10-25 17:39:54",
    },
    {
      id: 2,
      name: "Dish 2",
      price_cents: 2000,
      created_at: "2023-10-25 17:39:54",
    },
    {
      id: 3,
      name: "Dish 3",
      price_cents: 2000,
      created_at: "2023-10-25 17:39:54",
    },
    {
      id: 4,
      name: "Dish 4",
      price_cents: 2000,
      created_at: "2023-10-25 17:39:54",
    },
    {
      id: 5,
      name: "Dish 5",
      price_cents: 2000,
      created_at: "2023-10-25 17:39:54",
    },
    {
      id: 6,
      name: "Dish 6",
      price_cents: 2000,
      created_at: "2023-10-25 17:39:54",
    },
  ]

  nextOrderId = 2
  nextOrder_historyId = 2
  nextOrder_dishsId = 2

  async createOrder({ dishs_ids, user_id }) {
    const newOrder = {
      id: this.nextOrderId++,
      status: "pendente",
      created_at: "2023-10-25 17:39:54",
    }

    this.orders.push(newOrder)

    const newOrder_dishs = dishs_ids.map((dish) => {
      return {
        id: this.nextOrder_dishsId++,
        order_id: newOrder.id,
        dish_id: dish.id,
        quantity: dish.quantity,
      }
    })

    this.orders_dishs.push(...newOrder_dishs)

    const newOrder_history = {
      id: this.nextOrder_historyId++,
      user_id,
      order_id: newOrder.id,
      created_at: "2023-10-25 17:39:54",
    }

    this.orders_history.push(newOrder_history)

    return newOrder.id
  }

  async updateOrderStatus({ order_id, status }) {
    const order = this.orders.find((order) => order.id === order_id)

    order.status = status

    return
  }

  async showUserOrders(user_id, status) {
    if (status) {
      const orders = this.orders.filter((order) => {
        const orderHistory = this.orders_history.find(
          (oh) => oh.order_id === order.id && oh.user_id === user_id
        )
        return order.status === status && orderHistory
      })

      const result = orders.map((order) => {
        const orderDish = this.orders_dishs.find(
          (od) => od.order_id === order.id
        )
        const dish = this.dishs.find((d) => d.id === orderDish.dish_id)
        return {
          id: order.id,
          status: order.status,
          quantity: orderDish.quantity,
          name: dish.name,
        }
      })

      return result
    }

    if (!status) {
      const ordersHistory = this.orders_history.filter(
        (orderHistory) => orderHistory.user_id === user_id
      )

      const result = ordersHistory.map((orderHistory) => {
        const order = this.orders.find((o) => o.id === orderHistory.order_id)
        const orderDish = this.orders_dishs.find(
          (od) => od.order_id === order.id
        )
        const dish = this.dishs.find((d) => d.id === orderDish.dish_id)
        return {
          id: order.id,
          status: order.status,
          quantity: orderDish.quantity,
          name: dish.name,
        }
      })

      return result
    }
  }

  async indexAllOrders(status) {
    if (status) {
      const orders = this.orders.filter((order) => {
        const orderHistory = this.orders_history.find(
          (oh) => oh.order_id === order.id
        )
        return order.status === status && orderHistory
      })

      const result = orders.map((order) => {
        const orderDish = this.orders_dishs.find(
          (od) => od.order_id === order.id
        )
        const dish = this.dishs.find((d) => d.id === orderDish.dish_id)
        return {
          id: order.id,
          status: order.status,
          created_at: order.created_at,
          quantity: orderDish.quantity,
          name: dish.name,
        }
      })

      return result
    }

    if (!status) {
      const orders = this.orders

      const result = orders.map((order) => {
        const orderDish = this.orders_dishs.find(
          (od) => od.order_id === order.id
        )
        const dish = this.dishs.find((d) => d.id === orderDish.dish_id)
        return {
          id: order.id,
          status: order.status,
          created_at: order.created_at,
          quantity: orderDish.quantity,
          name: dish.name,
        }
      })

      return result
    }
  }
}

module.exports = OrdersRepositoryInMemory
