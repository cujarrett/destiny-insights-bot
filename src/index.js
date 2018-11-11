const braytech = require("./integrations/braytech.js")

const main = async () => {
  const response = await braytech.getModsForSale()
  // Allow app to log mods
  // eslint-disable-next-line no-console
  console.log(response)
}

try {
  main()
} catch (error) {
  // Allow app to log errors
  // eslint-disable-next-line no-console
  console.log(error)
}
