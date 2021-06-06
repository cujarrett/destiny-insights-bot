const { getXur } = require("../integrations/destiny-insights-backend.js")
const { addXurItem, getLastSoldXurItems } = require("../integrations/dynamodb.js")
const { isNewInventory } = require ("../util/is-new-inventory.js")
const { tweet } = require("../integrations/twitter.js")

module.exports.xur = async () => {
  let result
  const { inventory } = await getXur()
  const lastSoldItems = await getLastSoldXurItems()
  const newInventory = await isNewInventory(inventory, lastSoldItems)

  if (newInventory) {
    const { inventory: doubleCheckedMods } = await getXur()
    const confirmedNewInventory = await isNewInventory(doubleCheckedMods, lastSoldItems)
    if (confirmedNewInventory) {
      const timestamp = new Date().toISOString()
      for (const item of inventory) {
        await addXurItem(item, timestamp)
      }
      /* eslint-disable max-len */
      const message = `Xur is selling:

${inventory[0].name}

${inventory[1].name}
${inventory[1].mobility}-${inventory[1].resilience}-${inventory[1].recovery}-${inventory[1].discipline}-${inventory[1].intellect}-${inventory[1].strength} (${inventory[1].total})

${inventory[2].name}
${inventory[2].mobility}-${inventory[2].resilience}-${inventory[2].recovery}-${inventory[2].discipline}-${inventory[2].intellect}-${inventory[2].strength} (${inventory[2].total})

${inventory[3].name}
${inventory[3].mobility}-${inventory[3].resilience}-${inventory[3].recovery}-${inventory[3].discipline}-${inventory[3].intellect}-${inventory[3].strength} (${inventory[3].total})

Mob-Res-Rec-Dis-Int-Str

#Destiny2 #TwitterBot`
      /* eslint-enable max-len */
      await tweet(message)
      result = `Tweeted:\n${message}`
    }
  } else {
    result = "New Xur tweet is not ready"
  }
  return result
}
