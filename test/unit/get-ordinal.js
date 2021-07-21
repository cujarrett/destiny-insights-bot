const test = require("ava")
const { getOrdinal } = require("../../src/util/get-ordinal.js")

test("Unit - getOrdinal", async (assert) => {
  let result = getOrdinal(4)
  assert.is(result, "th")
  result = getOrdinal(25)
  assert.is(result, "th")
  result = getOrdinal(31)
  assert.is(result, "st")
  result = getOrdinal(22)
  assert.is(result, "nd")
  result = getOrdinal(23)
  assert.is(result, "rd")
})
