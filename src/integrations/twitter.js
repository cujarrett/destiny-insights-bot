const Twit = require("twit")
const { getSecret } = require("./aws-secrets-manager.js")

module.exports.test = async (message) => {
  const {
    TWITTER_TEST_CONSUMER_API_KEY,
    TWITTER_TEST_CONSUMER_SECRET,
    TWITTER_TEST_ACCESS_TOKEN,
    TWITTER_TEST_ACCESS_TOKEN_SECRET
  } = await getSecret()

  // Allow Twit mandated use of _ in object keys
  /* eslint-disable camelcase*/
  const twitterBotConfig = {
    consumer_key: TWITTER_TEST_CONSUMER_API_KEY,
    consumer_secret: TWITTER_TEST_CONSUMER_SECRET,
    access_token: TWITTER_TEST_ACCESS_TOKEN,
    access_token_secret: TWITTER_TEST_ACCESS_TOKEN_SECRET,
    timeout_ms: 60 * 1000,
    strictSSL: true
  }
  /* eslint-disable camelcase*/

  const response = await tweet(message, twitterBotConfig)
  return response
}

module.exports.post = async (message) => {
  const {
    TWITTER_CONSUMER_API_KEY,
    TWITTER_CONSUMER_SECRET,
    TWITTER_ACCESS_TOKEN,
    TWITTER_ACCESS_TOKEN_SECRET
  } = await getSecret()

  // Allow Twit mandated use of _ in object keys
  /* eslint-disable camelcase*/
  const twitterBotConfig = {
    consumer_key: TWITTER_CONSUMER_API_KEY,
    consumer_secret: TWITTER_CONSUMER_SECRET,
    access_token: TWITTER_ACCESS_TOKEN,
    access_token_secret: TWITTER_ACCESS_TOKEN_SECRET,
    timeout_ms: 60 * 1000,
    strictSSL: true
  }
  /* eslint-disable camelcase*/

  const response = await tweet(message, twitterBotConfig)
  console.log(response)
}

const tweet = async (message, twitterBotConfig) => {
  try {
    const twitter = new Twit(twitterBotConfig)
    await twitter.post("statuses/update", { status: message })
    return `Tweeted: ${message}`
  } catch (error) {
    throw new Error(`Twitter Error from trying to tweet ${message} - ${error}`)
  }
}
