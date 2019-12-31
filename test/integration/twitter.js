const test = require("tape-async")
const twitter = require("../../src/integrations/twitter.js")
// eslint-disable-next-line max-len
const { TWITTER_TEST_CONSUMER_API_KEY, TWITTER_TEST_CONSUMER_SECRET, TWITTER_TEST_ACCESS_TOKEN, TWITTER_TEST_ACCESS_TOKEN_SECRET } = require("../../src/settings.js")

// Allow Twit mandated use of _ in object keys
/* eslint-disable camelcase*/
const twitterTestBotConfig = {
  consumer_key: TWITTER_TEST_CONSUMER_API_KEY,
  consumer_secret: TWITTER_TEST_CONSUMER_SECRET,
  access_token: TWITTER_TEST_ACCESS_TOKEN,
  access_token_secret: TWITTER_TEST_ACCESS_TOKEN_SECRET,
  timeout_ms: 60 * 1000,
  strictSSL: true
}
/* eslint-disable camelcase*/

test("Integration - Twitter", async (assert) => {
  assert.plan(1)
  const response = await twitter.post(`${Date()} Test`, twitterTestBotConfig)
  assert.true(response, "Ability to tweet verified")
})
