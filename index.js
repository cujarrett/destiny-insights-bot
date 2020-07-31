const braytech = require("./src/integrations/braytech.js")
const twitter = require("./src/integrations/twitter.js")

exports.handler = async (event, context, callback) => {
  try {
    const mods = await braytech.getModsForSale()
    const [firstMod, secondMod] = mods
    // Allow tweet to be longer than 100 characters
    // eslint-disable-next-line max-len
    const message = `Banshee-44 is selling ${firstMod} and ${secondMod} today. #Destiny2 #TwitterBot`
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
