const test = require("ava")
const { getVendorInventory } = require("../../src/integrations/destiny-insights-backend.js")

test("Integration - api.destinyinsights Xur", async (assert) => {
  const { inventory } = await getVendorInventory("xur")
  assert.truthy(inventory)
})
