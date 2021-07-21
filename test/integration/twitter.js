const test = require("ava")
const twitter = require("../../src/integrations/twitter.js")

test("Integration - Twitter", async (assert) => {
  const response = await twitter.test(`${Date()} Test`)
  assert.truthy(response)
})
