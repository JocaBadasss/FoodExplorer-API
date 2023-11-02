const { object, string } = require("yup")

const userCreateServiceValidationSchema = object().shape({
  name: string().required("O nome é obrigatório"),
  email: string().email("Email inválido").required("O email é obrigatório"),
  password: string()
    .required("A senha é obrigatória")
    .min(8, "A senha deve ter pelo menos 8 caracteres"),
})

module.exports = userCreateServiceValidationSchema
