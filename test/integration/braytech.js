const prettyMs = require("pretty-ms")
const test = require("tape-async")
const StopWatch = require("statman-stopwatch")
const braytech = require("../../src/integrations/braytech.js")

test("Integration - Braytech", async (assert) => {
  const stopwatch = new StopWatch(true)
  assert.plan(2)

  const response = await braytech.getModsForSale()
  assert.true(response.mods[0], "First mod verified")
  assert.true(response.mods[1], "First mod verified")

  stopwatch.stop()
  const time = prettyMs(stopwatch.time())

  console.log(`Time to complete: ${time}`)
})
