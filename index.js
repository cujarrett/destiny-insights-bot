const { getModsForSale } = require("./src/integrations/banshee-44-mods.js")
const { getLastModTweetDate, tweet } = require("./src/integrations/twitter.js")
const { getModTweetMessage } = require("./src/util/get-mod-tweet-message.js")

exports.handler = async (event, context, callback) => {
  try {
    let response = {}
    const modsResponse = await getModsForSale()
    const error = modsResponse.metadata.error
    if (error) {
      response = {
        statusCode: 424,
        body: error
      }
    } else {
      const lastUpdated = modsResponse.metadata.lastUpdated
      const lastUpdatedDate = new Date(lastUpdated)
      const lastModTweet = await getLastModTweetDate()
      const isTweetReady = lastUpdatedDate > lastModTweet

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
          body: `Tweeted:\n${message}`
        }
      } else {
        response = {
          statusCode: 200,
          body: "New tweet is not ready"
        }
      }
    }

    context.callbackWaitsForEmptyEventLoop = false
    callback(null, response)
    return response
  } catch (error) {
    console.log(error)
    context.callbackWaitsForEmptyEventLoop = false
    const response = {
      statusCode: 500,
      body: error
    }
    callback(new Error(error), response)
  }
}
