const fetch = require("node-fetch")

module.exports.getModsForSale = async () => {
  const endpoint = "https://api.banshee44mods.com/info"
  const options = {
    method: "GET",
    json: true
  }

  let rawResponse = ""
  let response = ""

  try {
    rawResponse = await fetch(endpoint, options)
    response = await rawResponse.json()
    const mod1 = response.inventory.mods[0].name
    const mod2 = response.inventory.mods[1].name
    return [mod1, mod2]
  } catch (error) {
    console.log("rawResponse")
    console.log(rawResponse)
    console.log("response")
    console.log(response)
    console.log(error)

    throw new Error("https://api.banshee44mods.com is not available or not working.")
  }
}
