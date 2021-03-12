const test = require("tape-async")
const { getTweetMessage } = require("../../src/util/get-tweet-message.js")

test("Unit - getTweetMessage", async (assert) => {
  assert.plan(1)
  const mod1Info = `Freehand Grip
- Sold 37 times in the last year
- 10.14% year drop rate
- Last sold Mar 10th 2021`
  const mod2Info = `Unflinching Sniper Aim
- First time sold in the last year
- 0.27% year drop rate`

  const result = getTweetMessage(mod1Info, mod2Info)
  const expected = `Banshee-44 is selling:

Freehand Grip
- Sold 37 times in the last year
- 10.14% year drop rate
- Last sold Mar 10th 2021

Unflinching Sniper Aim
- First time sold in the last year
- 0.27% year drop rate

#Destiny2 #TwitterBot`

  assert.equal(result, expected, "correct tweet message verified")
})
