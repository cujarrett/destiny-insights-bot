const test = require("tape-async")
const braytech = require("../../src/integrations/braytech.js")

test("Integration - Braytech", async (assert) => {
  assert.plan(2)
  const [firstMod, secondMod] = await braytech.getModsForSale()
  assert.true(firstMod, "First mod verified")
  assert.true(secondMod, "First mod verified")
})
