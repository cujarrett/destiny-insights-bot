const test = require("tape-async")
const { getTweetMessage } = require("../../src/tweet-types/mods.js")

test("Unit - getTweetMessage", async (assert) => {
  assert.plan(1)
  const mod1Info = `Freehand Grip
- Sold 37 times in the last year
- Last sold Mar 10th 2021`
  const mod2Info = `Unflinching Sniper Aim
- First time sold in the last year`

  const result = getTweetMessage(mod1Info, mod2Info)
  const expected = `Banshee-44 is selling:

Freehand Grip
- Sold 37 times in the last year
- Last sold Mar 10th 2021

Unflinching Sniper Aim
- First time sold in the last year

#Destiny2 #TwitterBot`

  assert.equal(result, expected, "correct tweet message verified")
})
