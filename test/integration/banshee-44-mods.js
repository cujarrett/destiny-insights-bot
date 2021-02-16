const test = require("tape-async")
const { getModsForSale } = require("../../src/integrations/banshee-44-mods.js")

test("Integration - api.banshee44mods", async (assert) => {
  assert.plan(2)
  const [firstMod, secondMod] = await getModsForSale()
  assert.true(firstMod, "Ability to fetch the first mod verified")
  assert.true(secondMod, "Ability to fetch the second mod verified")
})
