const test = require("tape-async")
const { getOrdinal } = require("../../src/util/get-ordinal.js")

test("Unit - getOrdinal", async (assert) => {
  assert.plan(5)
  let result = getOrdinal(4)
  assert.equal(result, "th", "getOrdinal handling th verified")
  result = getOrdinal(25)
  assert.equal(result, "th", "getOrdinal handling th verified")
  result = getOrdinal(31)
  assert.equal(result, "st", "getOrdinal handling st verified")
  result = getOrdinal(22)
  assert.equal(result, "nd", "getOrdinal handling nd verified")
  result = getOrdinal(23)
  assert.equal(result, "rd", "getOrdinal handling rd verified")
})
