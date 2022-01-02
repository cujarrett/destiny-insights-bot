const { getVendorInventory } = require("../integrations/destiny-insights-backend.js")
const { addItem, getLastSoldItems } = require("../integrations/dynamodb.js")
const { isNewInventory } = require ("../util/is-new-inventory.js")
const { getRoll } = require("../util/get-roll.js")
const { prettyVendorNames } = require("../data/pretty-vendor-names.js")
const { getCompareStrings } = require("../util/get-compare-strings.js")
const { tweet } = require("../integrations/twitter.js")
const { isArmorWellRolled } = require("../util/is-armor-well-rolled.js")

const getArmorInfo = (armor) => {
  let info = ""

  for (const [index, item] of armor.entries()) {
    /* eslint-disable max-len */
    info += `${item.class.charAt(0).toUpperCase()}${item.class.substr(1)} ${item.type}
${item.mobility}-${item.resilience}-${item.recovery}-${item.discipline}-${item.intellect}-${item.strength} (${item.total})`
    /* eslint-enable max-len */

    // Increase index by 1 to account for 0 based index
    if (index + 1 < armor.length) {
      info += "\n"
    }
  }

  return info
}

module.exports.highStatLegendaryArmor = async (vendor) => {
  console.log(`highStatLegendaryArmor called for ${vendor}`)
  let result
  const { inventory: { armor } } = await getVendorInventory(vendor)
  const currentInventory = [...armor]
  const legendaryArmor = currentInventory.filter((item) => item.type.startsWith("Legendary"))

  const wellRolledArmor = []
  for (const item of legendaryArmor) {
    if (isArmorWellRolled(item)) {
      wellRolledArmor.push(item)
    }
  }
  const currentInventoryForCompare = getCompareStrings(wellRolledArmor)
  const lastSoldItems = await getLastSoldItems(vendor, 7)
  // Looking for - in the roll finds armor as weapons are comma separated
  // eslint-disable-next-line max-len
  const legendaryLastSoldArmor = lastSoldItems.filter((item) => item.type.startsWith("Legendary") && item.roll.includes("-"))
  const lastLegendaryArmorInventoryForCompare = getCompareStrings(legendaryLastSoldArmor)
  // eslint-disable-next-line max-len
  const newInventory = await isNewInventory(currentInventoryForCompare, lastLegendaryArmorInventoryForCompare)

  if (newInventory) {
    const timestamp = new Date().toISOString()
    for (const item of wellRolledArmor) {
      item.source = vendor
      item.roll = getRoll(item)
      await addItem(item, timestamp)
    }
    const message = `${prettyVendorNames[vendor]} is selling:

${getArmorInfo(wellRolledArmor)}

Mob-Res-Rec-Dis-Int-Str

#Destiny2 #TwitterBot`

    await tweet(message)
    result = `Tweeted:\n${message}`
  } else {
    result = `New ${prettyVendorNames[vendor]} legendary high stat armor tweet is not ready`
  }
  return result
}
