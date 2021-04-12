const test = require("tape-async")
const { getMods } = require("../../src/integrations/destiny-insights-backend.js")

test("Integration - api.destinyinsights", async (assert) => {
  assert.plan(2)
  const response = await getMods()
  const [firstMod, secondMod] = response.inventory
  assert.true(firstMod, "Ability to fetch the first mod verified")
  assert.true(secondMod, "Ability to fetch the second mod verified")

  // We can't automate getXur as it's not available Monday through Friday
})
