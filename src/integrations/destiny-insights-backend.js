const fetch = require("node-fetch")

module.exports.getAda1 = async () => {
  console.log("getAda1 called")
  const endpoint = "https://api.destinyinsights.com/ada-1"
  const options = {
    method: "GET",
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

module.exports.getBanshee44 = async () => {
  console.log("getBanshee44 called")
  const endpoint = "https://api.destinyinsights.com/banshee-44"
  const options = {
    method: "GET",
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

module.exports.getXur = async () => {
  console.log("getXur called")
  const endpoint = "https://api.destinyinsights.com/xur"
  const options = {
    method: "GET",
    json: true
  }
  const maxRetries = 3
  let rawResponse = await fetch(endpoint, options)
  let isValidResponse = rawResponse.status === 200
  let getXurDataRetries = 0

  if (!isValidResponse) {
    while (getXurDataRetries < maxRetries && !isValidResponse) {
      getXurDataRetries += 1
      console.log({ getXurDataRetries })
      rawResponse = await fetch(endpoint, options)
      isValidResponse = rawResponse.status === 200
    }

    if (getXurDataRetries === maxRetries && !isValidResponse) {
      // eslint-disable-next-line max-len
      throw new Error(`${endpoint} failed to respond successfully ${maxRetries} times`)
    }
  }

  const response = await rawResponse.json()
  return response
}
