const Twit = require("twit")
const { getParameters } = require("./aws-parameter-store.js")

const getTwitterBotConfig = async () => {
  // eslint-disable-next-line max-len
  const { TWITTER_CONSUMER_API_KEY, TWITTER_CONSUMER_SECRET, TWITTER_ACCESS_TOKEN, TWITTER_ACCESS_TOKEN_SECRET } = await getParameters()
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
  return twitterBotConfig
}

const getTestTwitterBotConfig = () => {
  // eslint-disable-next-line max-len
  const { TWITTER_TEST_CONSUMER_API_KEY, TWITTER_TEST_CONSUMER_SECRET, TWITTER_TEST_ACCESS_TOKEN, TWITTER_TEST_ACCESS_TOKEN_SECRET } = require("../settings.js")
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
  return twitterBotConfig
}

module.exports.test = async (message) => {
  const twitterBotConfig = getTestTwitterBotConfig()
  return await post(message, twitterBotConfig)
}

module.exports.tweet = async (message) => {
  const twitterBotConfig = await getTwitterBotConfig()
  await post(message, twitterBotConfig)
}

const post = async (message, twitterBotConfig) => {
  try {
    const twitter = new Twit(twitterBotConfig)
    await twitter.post("statuses/update", { status: message })
    return `Tweeted: ${message}`
  } catch (error) {
    throw new Error(`Twitter Error from trying to tweet ${message} - ${error}`)
  }
}

module.exports.getLastModTweetDate = async () => {
  const twitterBotConfig = await getTwitterBotConfig()
  const twitter = new Twit(twitterBotConfig)
  const queryOptions = { screen_name: "destinyinsights", count: 15 }
  const response = await twitter.get("statuses/user_timeline", queryOptions)
  const tweets = response.data

  const timeline = []
  for (const tweet of tweets) {
    timeline.push({ timestamp: tweet.created_at, message: tweet.text })
  }

  const sortedTweets = timeline.sort((first, second) => {
    return new Date(second.timestamp) - new Date(first.timestamp)
  })

  const pastModTweets = []
  for (const tweet of sortedTweets) {
    if (tweet.message.startsWith("Banshee-44 is selling:")) {
      pastModTweets.push(new Date(tweet.timestamp))
    }
  }

  const sortedModTweets = pastModTweets.sort((first, second) => {
    return new Date(second.timestamp) - new Date(first.timestamp)
  })

  return sortedModTweets[0]
}
