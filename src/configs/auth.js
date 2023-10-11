module.exports = {
  jwt: {
    secret: process.env.AUTH_USER_SECRET,
    secretMaster: process.env.AUTH_MASTER_SECRET,
    expiresIn: "1d",
  },
}
