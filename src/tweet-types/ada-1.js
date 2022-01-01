const { getVendorInventory } = require("../integrations/destiny-insights-backend.js")
const { addItem, getLastSoldItems } = require("../integrations/dynamodb.js")
const { getModInfo } = require("../util/get-mod-info.js")
const { isNewInventory } = require ("../util/is-new-inventory.js")
const { tweet } = require("../integrations/twitter.js")

module.exports.getAda1TweetMessage = (mod1Info, mod2Info) => {
  return `Ada-1 is selling:

${mod1Info}

${mod2Info}

#Destiny2 #TwitterBot`
}

module.exports.ada1 = async () => {
  let result
  const { inventory: { mods: currentMods } } = await getVendorInventory("ada-1")
  const lastSoldMods = await getLastSoldItems("ada-1", 1)
  const newInventory = await isNewInventory(currentMods, lastSoldMods)

  if (newInventory) {
    const { inventory: { mods: doubleCheckedMods } } = await getVendorInventory("ada-1")
    const confirmedNewInventory = await isNewInventory(doubleCheckedMods, lastSoldMods)
    if (confirmedNewInventory) {
      const timestamp = new Date().toISOString()
      for (const mod of currentMods) {
        mod.source = "ada-1"
        await addItem(mod, timestamp)
      }
      const [mod1, mod2] = currentMods
      const mod1Info = await getModInfo(mod1)
      const mod2Info = await getModInfo(mod2)
      const message = this.getAda1TweetMessage(mod1Info, mod2Info)
      await tweet(message)
      result = `Tweeted:\n${message}`
    }
  } else {
    result = "New Ada-1 mods tweet is not ready"
  }
  return result
}
