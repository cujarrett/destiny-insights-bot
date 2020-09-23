const braytech = require("../../src/integrations/braytech.js")
const dynamodb = require("../../src/integrations/dynamodb.js")
const twitter = require("../../src/integrations/twitter.js")
const { getModDetails } = require("../../src/util/get-mod-details.js")
const { getModTweetMessage } = require("../../src/util/get-mod-tweet-message.js")

const test = async () => {
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

${new Date().toISOString()}`

  await twitter.test(message)
}

test()
