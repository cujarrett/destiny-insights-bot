const braytech = require("./src/integrations/braytech.js")
const dynamodb = require("./src/integrations/dynamodb.js")
const { tweet } = require("./src/integrations/twitter.js")
const { getModDetails } = require("./src/util/get-mod-details.js")
const { getModTweetMessage } = require("./src/util/get-mod-tweet-message.js")

exports.handler = async (event, context, callback) => {
  try {
    const mods = await braytech.getModsForSale()
    const [mod1, mod2] = mods
    await dynamodb.insertData(mod1, mod2)

    const mod1Data = await dynamodb.getDataForMod(mod1)
    const mod2Data = await dynamodb.getDataForMod(mod2)
    const mod1Details = await getModDetails(mod1Data)
    const mod2Details = await getModDetails(mod2Data)

    const getMod1TweetMessage = getModTweetMessage(mod1, mod1Details)
    const getMod2TweetMessage = getModTweetMessage(mod2, mod2Details)

    const message = `Banshee-44 is selling:

${getMod1TweetMessage}

${getMod2TweetMessage}

#Destiny2 #TwitterBot`

    await tweet(message)

    const response = {
      statusCode: 200,
      body: JSON.stringify(`${message} posted.`)
    }
    context.callbackWaitsForEmptyEventLoop = false
    callback(null, 200)
    return response
  } catch (error) {
    context.callbackWaitsForEmptyEventLoop = false
    callback(new Error(error), 424)
  }
}
