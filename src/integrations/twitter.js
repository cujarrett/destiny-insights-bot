const Twit = require("twit")
// eslint-disable-next-line max-len
const { TWITTER_CONSUMER_API_KEY, TWITTER_CONSUMER_SECRET, TWITTER_ACCESS_TOKEN, TWITTER_ACCESS_TOKEN_SECRET } = require("../settings.js")

// Allow Twit mandated use of _ in object keys
/* eslint-disable camelcase*/
const prodTwitterBotConfig = {
  consumer_key: TWITTER_CONSUMER_API_KEY,
  consumer_secret: TWITTER_CONSUMER_SECRET,
  access_token: TWITTER_ACCESS_TOKEN,
  access_token_secret: TWITTER_ACCESS_TOKEN_SECRET,
  timeout_ms: 60 * 1000,
  strictSSL: true
}
/* eslint-disable camelcase*/

module.exports.post = async (message, twitterBotConfig = prodTwitterBotConfig) => {
  try {
    const twitter = new Twit(twitterBotConfig)
    await twitter.post("statuses/update", { status: message })
    return `Tweeted: ${message}`
  } catch (error) {
    throw new Error(`Twitter Error from trying to tweet ${message} - ${error}`)
  }
}
