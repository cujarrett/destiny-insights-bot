const { getModsForSale } = require("./src/integrations/banshee-44-mods.js")
const { tweet } = require("./src/integrations/twitter.js")
const { getModTweetMessage } = require("./src/util/get-mod-tweet-message.js")

exports.handler = async (event, context, callback) => {
  try {
    const modsResponse = await getModsForSale()

    const now = new Date()
    const lastUpdated = modsResponse.metadata.lastUpdated
    const lastUpdatedDate = new Date(lastUpdated)
    const minsSinceModUpdate = ((now - lastUpdatedDate) / 1000) / 60
    const isTweetReady = minsSinceModUpdate < 15
    let response = {}

    if (isTweetReady) {
      const mods = modsResponse.inventory.mods
      const [mod1, mod2] = mods

      const getMod1TweetMessage = getModTweetMessage(mod1)
      const getMod2TweetMessage = getModTweetMessage(mod2)

      const message = `Banshee-44 is selling:

${getMod1TweetMessage}

${getMod2TweetMessage}

#Destiny2 #TwitterBot`

      await tweet(message)

      response = {
        statusCode: 200,
        body: JSON.stringify(`${message} posted.`)
      }
    } else {
      response = {
        statusCode: 200,
        body: JSON.stringify("New tweet is not ready.")
      }
    }

    context.callbackWaitsForEmptyEventLoop = false
    callback(null, 200)
    return response
  } catch (error) {
    context.callbackWaitsForEmptyEventLoop = false
    callback(new Error(error), 424)
  }
}
