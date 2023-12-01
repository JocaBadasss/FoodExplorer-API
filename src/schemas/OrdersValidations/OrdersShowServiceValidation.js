const { object, string } = require("yup")

const OrdersUpdateServiceValidationSchema = object().shape({
  status: string()
    .required("O status é obrigatório")
    .oneOf(
      [
        "Pendente",
        "Entregue",
        "Cancelado",
        "Confirmado",
        "Pagamento recusado",
        "Preparando",
      ],
      "Status inválido"
    ),
})

module.exports = OrdersUpdateServiceValidationSchema
