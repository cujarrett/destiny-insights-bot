const fetch = require("node-fetch")

module.exports.getModsForSale = async () => {
  const endpoint = "https://api.banshee44mods.com/info"
  const options = {
    method: "GET",
    json: true
  }

  const rawResponse = await fetch(endpoint, options)
  const response = await rawResponse.json()
  return response
}
