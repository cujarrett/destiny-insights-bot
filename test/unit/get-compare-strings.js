const test = require("ava")
const { getCompareStrings } = require("../../src/util/get-compare-strings.js")

test("Unit - getCompareStrings", async (assert) => {
  const mockData = [
    {
      itemHash: 1852587798,
      name: "Illicit Reaper Robes",
      type: "Legendary Chest Armor",
      class: "warlock",
      mobility: 2,
      resilience: 10,
      recovery: 19,
      discipline: 23,
      intellect: 8,
      strength: 2,
      total: 64
    }
  ]

  const result = getCompareStrings(mockData)
  assert.deepEqual(result, [{ name: "Illicit Reaper Robes 2-10-19-23-8-2" }])
})
