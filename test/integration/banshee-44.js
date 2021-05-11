const test = require("tape-async")
const { getBanshee44 } = require("../../src/integrations/destiny-insights-backend.js")

test("Integration - api.destinyinsights Banshee-44", async (assert) => {
  assert.plan(2)
  const response = await getBanshee44()
  const [firstMod, secondMod] = response.inventory
  assert.true(firstMod, "Ability to fetch the first mod verified")
  assert.true(secondMod, "Ability to fetch the second mod verified")
})
