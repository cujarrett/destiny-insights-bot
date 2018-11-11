const moment = require("moment")
const momentTimezone = require("moment-timezone")
const Twit = require("twit")
const braytech = require("./integrations/braytech.js")
// eslint-disable-next-line max-len
const { twitterConsumerApiKey, twitterConsumerSecret, twitterAccessToken, twitterAccessTokenSecret } = require("./settings.js")

// Allow Twit mandated use of _ in object keys
/* eslint-disable camelcase*/
const twitterBotConfig = {
  consumer_key: twitterConsumerApiKey,
  consumer_secret: twitterConsumerSecret,
  access_token: twitterAccessToken,
  access_token_secret: twitterAccessTokenSecret,
  timeout_ms: 60 * 1000,
  strictSSL: true
}
/* eslint-disable camelcase*/

const main = async () => {
  process.env.PORT || 3000
  momentTimezone.tz.setDefault("America/Chicago")

  // setInterval(async () => {
    const currentTime = moment().format("hh:mm a")
    const timestamp = moment().format("YYYY-DD-MM, hh:mm:ss a")

    // if (currentTime === "11:01 am") {
      const { mods } = await braytech.getModsForSale()
      const firstMod = mods[0]
      const secondMod = mods[1]

      const twitter = new Twit(twitterBotConfig)
      // Allow tweet to be longer than 100 characters
      // eslint-disable-next-line max-len
      const tweet = `Banshee-44 is selling ${firstMod} and ${secondMod} today. #Destiny2 #TwitterBot`

      twitter.post("statuses/update", { status: tweet })
      // Allow server side logging
      // eslint-disable-next-line no-console
      console.log(`${timestamp} - Tweeted: ${tweet}`)
    }
    // Allow server side logging
    // eslint-disable-next-line no-console
    // console.log(`${timestamp} - Not time to tweet yet`)
  // }, 60 * 1000)
}

try {
  main()
} catch (error) {
  // Allow app to log errors
  // eslint-disable-next-line no-console
  console.log(error)
}
