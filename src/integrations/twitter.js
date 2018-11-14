const moment = require("moment")
const Twit = require("twit")
// eslint-disable-next-line max-len
const { twitterConsumerApiKey, twitterConsumerSecret, twitterAccessToken, twitterAccessTokenSecret } = require("../settings.js")

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

module.exports.post = async (message) => {
  try {
    const timestamp = moment().format("YYYY-DD-MM, hh:mm:ss a")
    const twitter = new Twit(twitterBotConfig)
    twitter.post("statuses/update", { status: message })
    console.log(`${timestamp} - Tweeted: ${message}`)
  } catch (error) {
    const timestamp = moment().format("YYYY-DD-MM, hh:mm:ss a")
    console.log(`${timestamp} - ${error}`)
  }
}
