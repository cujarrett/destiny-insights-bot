const test = require("ava")
const { isArmorWellRolled } = require("../../src/util/is-armor-well-rolled.js")

test("Unit - isArmorWellRolled", async (assert) => {
  const mockData1 = {
    itemHash: 3552091116,
    name: "Illicit Reaper Boots",
    type: "Legendary Leg Armor",
    class: "warlock",
    mobility: 2,
    resilience: 10,
    recovery: 17,
    discipline: 2,
    intellect: 15,
    strength: 14,
    total: 60
  }

  const mockData2 = {
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

  let result = isArmorWellRolled(mockData1)
  assert.is(result, false)
  result = isArmorWellRolled(mockData2)
  assert.is(result, true)
})
