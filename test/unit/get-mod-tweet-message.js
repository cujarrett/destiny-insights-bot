const test = require("tape-async")
const { getModTweetMessage } = require("../../src/util/get-mod-tweet-message.js")

test("Unit - getModTweetMessage", async (assert) => {
  assert.plan(2)
  let mod = "Backup Mag"
  let modDetails = {
    soldCountMessage: "Sold 38 times in the last year",
    soldRateMessage: "10.41% year drop rate",
    lastSoldDateMessage: "Last sold Sep 7th 2020"
  }
  let result = getModTweetMessage(mod, modDetails)
  let expected = `Backup Mag
- Sold 38 times in the last year
- 10.41% year drop rate
- Last sold Sep 7th 2020`
  let testDescription = "getModTweetMessage handling for previously dropped mod verified"
  assert.equal(result, expected, testDescription)

  mod = "Blast Radius"
  modDetails = {
    soldCountMessage: "First time sold in the last year",
    soldRateMessage: "0.27% year drop rate"
  }
  result = getModTweetMessage(mod, modDetails)
  expected = `Blast Radius
- First time sold in the last year
- 0.27% year drop rate`
  testDescription = "getModTweetMessage handling for previously dropped mod verified"
  assert.equal(result, expected, testDescription)
})
