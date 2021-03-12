const { getModsForSale } = require("./src/integrations/banshee-44-mods.js")
const { getLastModTweetDate, tweet } = require("./src/integrations/twitter.js")
const { getModInfo } = require("./src/util/get-mod-info.js")
const { getTweetMessage } = require("./src/util/get-tweet-message.js")
const { name, version } = require("./package.json")

exports.handler = async (event, context, callback) => {
  console.log(`${name} ${version} called`)
  let modsResponse
  let result
  try {
    modsResponse = await getModsForSale()
  } catch (error) {
    result = { statusCode: 424, body: error }
  }

  const lastUpdated = modsResponse.metadata.lastUpdated
  const lastUpdatedDate = new Date(lastUpdated)
  const lastModTweet = await getLastModTweetDate()
  const isTweetReady = lastUpdatedDate > lastModTweet

  if (isTweetReady) {
    const mods = modsResponse.inventory.mods
    const [mod1, mod2] = mods
    const mod1Info = getModInfo(mod1)
    const mod2Info = getModInfo(mod2)
    const message = getTweetMessage(mod1Info, mod2Info)
    await tweet(message)
    result = { statusCode: 200, body: `Tweeted:\n${message}` }
  } else {
    result = { statusCode: 200, body: "New tweet is not ready" }
  }

  if (result.statusCode === 200) {
    callback(null, result)
  } else {
    callback(new Error(result.body), result)
  }

  context.callbackWaitsForEmptyEventLoop = false
  console.log(`Completing request:\n${JSON.stringify(result, null, "  ")}`)
  return result
}
