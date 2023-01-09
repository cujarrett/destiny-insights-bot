const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args))
const { getParameters } = require("./aws-parameter-store.js")

module.exports.getVendorInventory = async (vendor) => {
  console.log(`getVendorInventory for ${vendor} called`)
  const { DESTINY_INSIGHTS_BACKEND_AUTH_KEY } = await getParameters()

  const endpoint = `https://api.destinyinsights.com/${vendor}`
  const options = {
    method: "GET",
    headers: {'key': DESTINY_INSIGHTS_BACKEND_AUTH_KEY },
    json: true
  }
  const maxRetries = 3
  let rawResponse = await fetch(endpoint, options)
  let isValidResponse = rawResponse.status === 200
  let getModDataRetries = 0

  if (!isValidResponse) {
    while (getModDataRetries < maxRetries && !isValidResponse) {
      getModDataRetries += 1
      console.log({ getModDataRetries })
      rawResponse = await fetch(endpoint, options)
      isValidResponse = rawResponse.status === 200
    }

    if (getModDataRetries === maxRetries && !isValidResponse) {
      // eslint-disable-next-line max-len
      throw new Error(`${endpoint} failed to respond successfully ${maxRetries} times`)
    }
  }

  const response = await rawResponse.json()
  return response
}
