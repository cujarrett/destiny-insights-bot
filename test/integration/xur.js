const test = require("ava")
const { getXur } = require("../../src/integrations/destiny-insights-backend.js")

test("Integration - api.destinyinsights Xur", async (assert) => {
  const { inventory } = await getXur()
  assert.truthy(inventory)
})
