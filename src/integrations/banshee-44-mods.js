const fetch = require("node-fetch")

module.exports.getModsForSale = async () => {
  const endpoint = "https://api.banshee44mods.com/info"
  const options = {
    method: "GET",
    json: true
  }
  const maxRetries = 3
  let rawResponse = await fetch(endpoint, options)
  let isValidModData = rawResponse.status === 200
  let getModDataRetries = 0

  if (!isValidModData) {
    while (getModDataRetries < maxRetries && !isValidModData) {
      getModDataRetries += 1
      console.log({ getModDataRetries })
      rawResponse = await fetch(endpoint, options)
      isValidModData = rawResponse.status === 200
    }

    if (getModDataRetries === maxRetries && !isValidModData) {
      // eslint-disable-next-line max-len
      throw new Error(`https://api.banshee44mods.com/info failed to respond successfully ${maxRetries} times`)
    }
  }

  const response = await rawResponse.json()
  return response
}
