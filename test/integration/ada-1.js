const test = require("ava")
const { getAda1 } = require("../../src/integrations/destiny-insights-backend.js")

test("Integration - api.destinyinsights Ada-1", async (assert) => {
  const response = await getAda1()
  const [firstMod, secondMod] = response.inventory
  assert.truthy(firstMod)
  assert.truthy(secondMod)
})
