const { object, string, array } = require("yup")

const dishesUpdateServiceValidationSchema = object().shape({
  name: string()
    .strict(true)
    .typeError("O nome deve ser em texto")
    .required("O nome é obrigatório"),
  category: string()
    .strict(true)
    .required("A categoria é obrigatória")
    .typeError("A categoria deve ser em texto"),
  description: string()
    .strict(true)
    .required("A descrição é obrigatória")
    .max("300", "A descrição deve ter no máximo 300 caracteres")
    .typeError("A descrição deve ser em texto"),
  price_cents: string()
    .strict(true)
    .required("O valor é obrigatório")
    .typeError("O valor deve estar no formato xx,xx (por exemplo, 10,50)")
    .matches(
      /^[0-9]{1,3},[0-9]{2}$/,
      "O valor deve estar no formato xx,xx (por exemplo, 10,50, 100,50)"
    ),
  tags: array()
    .strict(true)

    .of(
      string()
        .min(3, "Um ingrediente deve ter pelo menos 3 caracteres")
        .required("Cada ingrediente deve ser em texto")
        .max(12, "Um ingrediente deve ter no máximo 12 caracteres")
        .strict(true)
    )
    .min(1, "Nenhum ingrediente pode estar vazio")
    .typeError("As tags devem estar em um array"),
})

module.exports = dishesUpdateServiceValidationSchema
