const test = require("ava")
const { getBanshee44 } = require("../../src/integrations/destiny-insights-backend.js")

test("Integration - api.destinyinsights Banshee-44", async (assert) => {
  const response = await getBanshee44()
  const [firstMod, secondMod] = response.inventory
  assert.truthy(firstMod)
  assert.truthy(secondMod)
})
