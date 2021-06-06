const { getBanshee44 } = require("../integrations/destiny-insights-backend.js")
const { addMod, getLastSoldBanshee44Mods } = require("../integrations/dynamodb.js")
const { getModInfo } = require("../util/get-mod-info.js")
const { isNewInventory } = require ("../util/is-new-inventory.js")
const { tweet } = require("../integrations/twitter.js")

module.exports.getBanshee44TweetMessage = (mod1Info, mod2Info) => {
  return `Banshee-44 is selling:

${mod1Info}

${mod2Info}

#Destiny2 #TwitterBot`
}

module.exports.banshee44 = async () => {
  let result
  const { inventory } = await getBanshee44()
  const lastSoldMods = await getLastSoldBanshee44Mods()
  const newInventory = await isNewInventory(inventory, lastSoldMods)

  if (newInventory) {
    const { inventory: doubleCheckedMods } = await getBanshee44()
    const confirmedNewInventory = await isNewInventory(doubleCheckedMods, lastSoldMods)
    if (confirmedNewInventory) {
      const timestamp = new Date().toISOString()
      for (const mod of inventory) {
        await addMod(mod, timestamp)
      }
      const [mod1, mod2] = inventory
      const mod1Info = await getModInfo(mod1)
      const mod2Info = await getModInfo(mod2)
      const message = this.getBanshee44TweetMessage(mod1Info, mod2Info)
      await tweet(message)
      result = `Tweeted:\n${message}`
    }
  } else {
    result = "New Banshee-44 mods tweet is not ready"
  }
  return result
}
