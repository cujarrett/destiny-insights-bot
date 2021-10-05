const { getXur } = require("../integrations/destiny-insights-backend.js")
const { addXurItem, getLastSoldXurItems } = require("../integrations/dynamodb.js")
const { isNewInventory } = require ("../util/is-new-inventory.js")
const { tweet } = require("../integrations/twitter.js")

module.exports.xur = async () => {
  let result
  const { inventory } = await getXur()
  const exotics = inventory.filter((item) => item.type.startsWith("Exotic"))
  const lastSoldItems = await getLastSoldXurItems()
  const newInventory = await isNewInventory(exotics, lastSoldItems)

  if (newInventory) {
    const { inventory: doubleCheckedMods } = await getXur()
    const exotics = inventory.filter((item) => item.type.startsWith("Exotic"))
    const confirmedNewInventory = await isNewInventory(doubleCheckedMods, lastSoldItems)
    if (confirmedNewInventory) {
      const timestamp = new Date().toISOString()
      for (const item of exotics) {
        await addXurItem(item, timestamp)
      }
      /* eslint-disable max-len */
      const message = `Xur is selling:

${exotics[0].name}

${exotics[1].name}
${exotics[1].mobility}-${exotics[1].resilience}-${exotics[1].recovery}-${exotics[1].discipline}-${exotics[1].intellect}-${exotics[1].strength} (${exotics[1].total})

${exotics[2].name}
${exotics[2].mobility}-${exotics[2].resilience}-${exotics[2].recovery}-${exotics[2].discipline}-${exotics[2].intellect}-${exotics[2].strength} (${exotics[2].total})

${exotics[3].name}
${exotics[3].mobility}-${exotics[3].resilience}-${exotics[3].recovery}-${exotics[3].discipline}-${exotics[3].intellect}-${exotics[3].strength} (${exotics[3].total})

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
