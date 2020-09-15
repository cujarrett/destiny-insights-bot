const test = require("tape-async")
const { deleteKey, getDataForMod, insertData } = require("../../src/integrations/dynamodb.js")

test("Integration - DynamoDb", async (assert) => {
  assert.plan(3)
  await insertData("foobaz", "barbaz")
  let modInfo = await getDataForMod("foobaz")
  assert.true(modInfo.length > 0, "insertData verified")
  for (const item of modInfo) {
    await deleteKey(item.timestamp)
  }
  modInfo = await getDataForMod("foobaz")
  modInfo = await getDataForMod("barbaz")
  assert.true(modInfo.length === 0, "deleteKey verified")
  assert.true(modInfo.length === 0, "getModInfo verified")
})
