const test = require("tape-async")
const { getModTweetMessage } = require("../../src/util/get-mod-tweet-message.js")

test("Unit - getModTweetMessage", async (assert) => {
  assert.plan(2)
  let mod = {
    name: "Freehand Grip",
    itemHash: 736000386,
    type: "Legendary Weapon Mod",
    lastSold: "2021-03-10",
    timesSoldInLastYear: 37
  }
  let result = getModTweetMessage(mod)
  let expected = `Freehand Grip
- Sold 37 times in the last year
- 10.14% year drop rate
- Last sold Mar 10th 2021`
  let testDescription = "getModTweetMessage handling for previously dropped mod verified"
  assert.equal(result, expected, testDescription)

  mod = {
    name: "Unflinching Sniper Aim",
    itemHash: 1203395203,
    type: "Common Chest Armor Mod",
    lastSold: "2021-03-01",
    timesSoldInLastYear: 1
  }
  result = getModTweetMessage(mod)
  expected = `Unflinching Sniper Aim
- First time sold in the last year
- 0.27% year drop rate`
  testDescription = "getModTweetMessage handling for fist time drop in the last year verified"
  assert.equal(result, expected, testDescription)
})
