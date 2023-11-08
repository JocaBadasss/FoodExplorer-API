const { object, string, array, number } = require("yup")

const dishSchema = object().shape({
  id: number().required(),
  quantity: number().required(),
})

const payerIdentificationSchema = object().shape({
  type: string().oneOf(["CPF", "CNPJ"]).required(),
  number: string().required(),
})

const payerSchema = object().shape({
  email: string().email().required(),
  identification: payerIdentificationSchema.required(),
})

const TransactionsCreateServiceValidationSchema = object().shape({
  token: string(),
  issuer_id: string().required(),
  payment_method_id: string().required(),
  installments: number().required(),
  description: string().required(),
  payer: payerSchema.required(),
  dishs: array().of(dishSchema).required(),
})

module.exports = TransactionsCreateServiceValidationSchema
