const moment = require("moment")
const momentTimezone = require("moment-timezone")
const twit = require("twit")
const braytech = require("./integrations/braytech.js")
const { twitterConsumerApiKey, twitterConsumerSecret, twitterAccessToken, twitterAccessTokenSecret } = require("./settings.js")

const twitterBotConfig = {
  consumer_key: twitterConsumerApiKey,
  consumer_secret: twitterConsumerSecret,
  access_token: twitterAccessToken,
  access_token_secret: twitterAccessTokenSecret,
  timeout_ms: 60*1000,
  strictSSL: true
}

const main = async () => {
  momentTimezone.tz.setDefault("America/Chicago")

  setInterval(async () => {
    const timestamp = moment().format("hh:mm a")

    if (timestamp === "11:01 am") {
      const { mods } = await braytech.getModsForSale()
      const firstMod = mods[0]
      const secondMod = mods[1]

      const twitter = new twit(twitterBotConfig)
      const tweet = `Banshee-44 is selling ${firstMod} and ${secondMod} today. #Destiny2 #TwitterBot`

      twitter.post("statuses/update", { status: tweet })
      console.log(`${timestamp} Tweeted: ${tweet}`)
    }
  }, 60 * 1000)
}

try {
  main()
} catch (error) {
  // Allow app to log errors
  // eslint-disable-next-line no-console
  console.log(error)
}
