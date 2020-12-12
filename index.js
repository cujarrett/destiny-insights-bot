const braytech = require("./src/integrations/braytech.js")
const dynamodb = require("./src/integrations/dynamodb.js")
const { tweet } = require("./src/integrations/twitter.js")
const { getModDetails } = require("./src/util/get-mod-details.js")
const { getModTweetMessage } = require("./src/util/get-mod-tweet-message.js")

exports.handler = async (event, context, callback) => {
  try {
    const mods = await braytech.getModsForSale()
    const [mod1, mod2] = mods

    const mod1Data = await dynamodb.getDataForMod(mod1)
    const mod2Data = await dynamodb.getDataForMod(mod2)

    // Add currently sold mods to front of array of mod sold data as I don't add
    // it to the database until after the tweet is successful to prevent
    // duplicates in the database from runtime errors
    const currentMods = { timestamp: new Date().toISOString(), mod1, mod2 }
    mod1Data.unshift(currentMods)
    mod2Data.unshift(currentMods)

    const mod1Details = await getModDetails(mod1Data)
    const mod2Details = await getModDetails(mod2Data)
    const getMod1TweetMessage = getModTweetMessage(mod1, mod1Details)
    const getMod2TweetMessage = getModTweetMessage(mod2, mod2Details)

    const message = `Banshee-44 is selling:

${getMod1TweetMessage}

${getMod2TweetMessage}

#Destiny2 #TwitterBot`

    await tweet(message)
    // TODO
    // await dynamodb.insertData(mod1, mod2)

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
