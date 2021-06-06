const test = require("tape-async")
const { getAda1 } = require("../../src/integrations/destiny-insights-backend.js")

test("Integration - api.destinyinsights Ada-1", async (assert) => {
  assert.plan(2)
  const response = await getAda1()
  const [firstMod, secondMod] = response.inventory
  assert.true(firstMod, "Ability to fetch the first mod verified")
  assert.true(secondMod, "Ability to fetch the second mod verified")
})
