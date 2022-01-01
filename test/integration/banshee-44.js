const test = require("ava")
const { getVendorInventory } = require("../../src/integrations/destiny-insights-backend.js")

test("Integration - api.destinyinsights Banshee-44", async (assert) => {
  const response = await getVendorInventory("banshee-44")
  const [firstMod, secondMod] = response.inventory.mods
  assert.truthy(firstMod)
  assert.truthy(secondMod)
})
