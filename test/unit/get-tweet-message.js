const test = require("tape-async")
const { getAda1TweetMessage } = require("../../src/tweet-types/ada-1.js")
const { getBanshee44TweetMessage } = require("../../src/tweet-types/banshee-44.js")

test("Unit - getBanshee44TweetMessage", async (assert) => {
  assert.plan(2)

  const mod1Info = `Freehand Grip
- Sold 37 times in the last year
- Last sold Mar 10th 2021`
  const mod2Info = `Unflinching Sniper Aim
- First time sold in the last year`

  let result = getBanshee44TweetMessage(mod1Info, mod2Info)
  let expected = `Banshee-44 is selling:

Freehand Grip
- Sold 37 times in the last year
- Last sold Mar 10th 2021

Unflinching Sniper Aim
- First time sold in the last year

#Destiny2 #TwitterBot`

  assert.equal(result, expected, "correct Banshee-44 tweet message verified")

  const mod3Info = `Freehand Grip
- Sold 37 times in the last year
- Last sold Mar 10th 2021`
  const mod4Info = `Unflinching Sniper Aim
- First time sold in the last year`

  result = getAda1TweetMessage(mod3Info, mod4Info)
  expected = `Ada-1 is selling:

Freehand Grip
- Sold 37 times in the last year
- Last sold Mar 10th 2021

Unflinching Sniper Aim
- First time sold in the last year

#Destiny2 #TwitterBot`

  assert.equal(result, expected, "correct Ada-1 tweet message verified")
})
