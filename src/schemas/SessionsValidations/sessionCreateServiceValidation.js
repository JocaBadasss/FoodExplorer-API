const { object, string } = require("yup")

const sessionCreateServiceValidationSchema = object().shape({
  email: string().email("Email inválido").required("O email é obrigatório"),
  password: string()
    .required("A senha é obrigatória")
    .min(8, "A senha deve ter pelo menos 8 caracteres"),
})

module.exports = sessionCreateServiceValidationSchema
