const Stopwatch = require("statman-stopwatch")
const test = require("tape-async")
const { formatTime } = require("../../src/util/format-time.js")

test("Unit - Util format-time", (assert) => {
  const stopwatch = new Stopwatch(true)
  assert.plan(2)
  let actual = formatTime(1100)
  assert.equal(actual, "1 seconds 100 milliseconds", "Formatting time over one second verified")
  actual = formatTime(100)
  assert.equal(actual, "100 milliseconds", "Formatting time under one second verified")
  stopwatch.stop()
  const time = formatTime(stopwatch.time())

  console.log(`Time to complete: ${time}`)
})
