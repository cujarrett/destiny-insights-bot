const test = require("tape-async")
const twitter = require("../../src/integrations/twitter.js")

test("Integration - Twitter", async (assert) => {
  assert.plan(1)
  const response = await twitter.test(`${Date()} Test`)
  assert.true(response, "Ability to tweet verified")
})
