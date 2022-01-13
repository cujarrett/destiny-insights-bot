const { getVendorInventory } = require("../integrations/destiny-insights-backend.js")
const { addItem, getLastSoldItems } = require("../integrations/dynamodb.js")
const { isNewInventory } = require ("../util/is-new-inventory.js")
const { getModLastSoldInfo } = require("../util/get-mod-last-sold-info.js")
const { tweet } = require("../integrations/twitter.js")

module.exports.getmodTweetMessage = async (ada1Mod1, ada1Mod2, banshee44Mod1, banshee44Mod2) => {
  const ada1Mod2LastSoldInfo = await getModLastSoldInfo(ada1Mod2)
  const ada1Mod1LastSoldInfo = await getModLastSoldInfo(ada1Mod1)
  const banshee44Mod1LastSoldInfo = await getModLastSoldInfo(banshee44Mod1)
  const banshee44Mod2LastSoldInfo = await getModLastSoldInfo(banshee44Mod2)

  return `Ada-1 is selling:
- ${ada1Mod2.name} (${ada1Mod2LastSoldInfo})
- ${ada1Mod1.name} (${ada1Mod1LastSoldInfo})

Banshee-44 is selling:
- ${banshee44Mod1.name} (${banshee44Mod1LastSoldInfo})
- ${banshee44Mod2.name} (${banshee44Mod2LastSoldInfo})

#Destiny2 #TwitterBot`
}

module.exports.mods = async () => {
  let result
  const { inventory: { mods: currentAda1Mods } } = await getVendorInventory("ada-1")
  const lastSoldAda1Mods = await getLastSoldItems("ada-1", 1)
  const newAda1Inventory = await isNewInventory(currentAda1Mods, lastSoldAda1Mods)
  const { inventory: { mods: currentBanshee44Mods } } = await getVendorInventory("banshee-44")
  const lastSoldBanshee44Mods = await getLastSoldItems("banshee-44", 1)
  const newBanshee44Inventory = await isNewInventory(currentBanshee44Mods, lastSoldBanshee44Mods)

  if (newAda1Inventory && newBanshee44Inventory) {
    const timestamp = new Date().toISOString()
    for (const mod of currentAda1Mods) {
      mod.source = "ada-1"
      await addItem(mod, timestamp)
    }
    const [ada1Mod1, ada1Mod2] = currentAda1Mods

    for (const mod of currentBanshee44Mods) {
      mod.source = "banshee-44"
      await addItem(mod, timestamp)
    }
    const [banshee44Mod1, banshee44Mod2] = currentBanshee44Mods

    const message = await this.getmodTweetMessage(ada1Mod1, ada1Mod2, banshee44Mod1, banshee44Mod2)

    await tweet(message)
    result = `Tweeted:\n${message}`
  } else {
    result = "New mods tweet is not ready"
  }
  return result
}
