const test = require("tape-async")
const { getModDetails } = require("../../src/util/get-mod-details.js")

const getMockRepeatedModData = () => {
  const now = new Date()
  const currentYear = now.getFullYear()

  return [
    {
      timestamp: `${currentYear}-08-08T17:00:09.000Z`,
      mod1: "Backup Mag",
      mod2: "Wrath of Rasputin"
    },
    {
      timestamp: `${currentYear}-07-26T17:00:09.000Z`,
      mod1: "Minor Spec",
      mod2: "Wrath of Rasputin"
    },
    {
      timestamp: `${currentYear}-07-26T17:00:09.000Z`,
      mod1: "Minor Spec",
      mod2: "Wrath of Rasputin"
    }
  ]
}

const getMockNewModData = () => {
  const now = new Date()
  const currentYear = now.getFullYear()

  return [
    {
      timestamp: `${currentYear}-09-12T17:00:34.700Z`,
      mod1: "Backup Mag",
      mod2: "Blast Radius"
    }
  ]
}

test("Unit - getModDetails", async (assert) => {
  assert.plan(9)
  const mockRepeatedModData = getMockRepeatedModData()
  let response = await getModDetails(mockRepeatedModData)

  let actual = response.soldCountMessage
  let expected = "Sold 3 times in the last year"
  let testDescription = "soldCountMessage for a mod sold in the last year verified"
  assert.equal(actual, expected, testDescription)

  actual = response.soldRateMessage
  expected = "0.82% year drop rate"
  testDescription = "soldRateMessage for a mod sold in the last year verified"
  assert.equal(actual, expected, testDescription)

  const now = new Date()
  const currentYear = now.getFullYear()
  actual = response.lastSoldDateMessage
  expected = `Last sold Jul 26th ${currentYear}`
  testDescription = "lastSoldDateMessage for a mod sold in the last year verified"
  assert.equal(actual, expected, testDescription)

  const mockNewModData = getMockNewModData()
  response = await getModDetails(mockNewModData)

  actual = response.soldCountMessage
  expected = "First time sold in the last year"
  testDescription = "soldCountMessage for a mod sold for the first time in the last year verified"
  assert.equal(actual, expected, testDescription)

  actual = response.soldRateMessage
  expected = "0.27% year drop rate"
  testDescription = "soldRateMessage for a mod sold for the first time in the last year verified"
  assert.equal(actual, expected, testDescription)

  actual = response.lastSoldDateMessage
  expected = undefined
  // eslint-disable-next-line max-len
  testDescription = "lastSoldDateMessage for a mod sold for the first time in the last year verified"
  assert.equal(actual, expected, testDescription)

  const mockEmptyModData = []
  response = await getModDetails(mockEmptyModData)

  actual = response.soldCountMessage
  expected = "Not sold in the last year"
  testDescription = "soldCountMessage for a mod not sold in the last year verified"
  assert.equal(actual, expected, testDescription)

  actual = response.soldRateMessage
  expected = "0% year drop rate"
  testDescription = "soldRateMessage for a mod not sold in the last year verified"
  assert.equal(actual, expected, testDescription)

  actual = response.lastSoldDateMessage
  expected = undefined
  testDescription = "lastSoldDateMessage for a mod not sold in the last year verified"
  assert.equal(actual, expected, testDescription)
})
