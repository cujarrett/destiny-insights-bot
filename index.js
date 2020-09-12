const braytech = require("./src/integrations/braytech.js")
const dynamodb = require("./src/integrations/dynamodb.js")
const twitter = require("./src/integrations/twitter.js")
const { getModDetails } = require("./src/util/get-mod-details.js")
const { getTimeWording } = require("./src/util/get-time-wording.js")

exports.handler = async (event, context, callback) => {
  try {
    const mods = await braytech.getModsForSale()
    const [mod1, mod2] = mods
    await dynamodb.insertData(mod1, mod2)

    const mod1Data = await dynamodb.getDataForMod(mod1)
    const mod2Data = await dynamodb.getDataForMod(mod2)
    const mod1Details = await getModDetails(mod1Data)
    const mod2Details = await getModDetails(mod2Data)

    const mod1TimeWording = getTimeWording(mod1Details.dropCount)
    const mod2TimeWording = getTimeWording(mod2Details.dropCount)

    const message = `Banshee-44 is selling:

${mod1}
- Sold ${mod1Details.dropCount} ${mod1TimeWording} in the last year
- ${mod1Details.dropRate}% Drop Rate
- Last sold ${mod1Details.lastDropDate}

${mod2}
- Sold ${mod2Details.dropCount} ${mod2TimeWording} in the last year
- ${mod2Details.dropRate}% Drop Rate
- Last sold ${mod2Details.lastDropDate}

#Destiny2 #TwitterBot`
    await twitter.post(message)

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
