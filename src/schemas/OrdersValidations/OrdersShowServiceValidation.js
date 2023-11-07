const { object, string } = require("yup")

const OrdersUpdateServiceValidationSchema = object().shape({
  status: string()
    .required("O status é obrigatório")
    .oneOf(
      [
        "pendente",
        "entregue",
        "cancelado",
        "confirmado",
        "Pagamento recusado",
        "Preparando",
      ],
      "Status inválido"
    ),
})

module.exports = OrdersUpdateServiceValidationSchema
