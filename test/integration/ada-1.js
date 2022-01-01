const test = require("ava")
const { getVendorInventory } = require("../../src/integrations/destiny-insights-backend.js")

test("Integration - api.destinyinsights Ada-1", async (assert) => {
  const response = await getVendorInventory("ada-1")
  const [firstMod, secondMod] = response.inventory.mods
  assert.truthy(firstMod)
  assert.truthy(secondMod)
})
