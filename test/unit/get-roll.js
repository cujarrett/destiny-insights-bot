const test = require("ava")
const { getRoll } = require("../../src/util/get-roll.js")

test("Unit - getRoll", async (assert) => {
  const mockData1 = {
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

  const mockData2 = {
    timestamp: "2022-01-02T05:17:49.782Z",
    name: "Illicit Reaper Robes",
    type: "Legendary Chest Armor",
    source: "xur",
    roll: "2-10-19-23-8-2"
  }

  let result = getRoll(mockData1)
  assert.is(result, "2-10-19-23-8-2")

  result = getRoll(mockData2)
  assert.is(result, "2-10-19-23-8-2")
})
