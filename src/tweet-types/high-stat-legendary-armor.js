const { getVendorInventory } = require("../integrations/destiny-insights-backend.js")
const { addItem, getLastSoldItems } = require("../integrations/dynamodb.js")
const { isNewInventory } = require ("../util/is-new-inventory.js")
const { getRoll } = require("../util/get-roll.js")
const { prettyVendorNames } = require("../data/pretty-vendor-names.js")
const { getCompareStrings } = require("../util/get-compare-strings.js")
const { tweet } = require("../integrations/twitter.js")
const { isArmorHighStat } = require("../util/is-armor-high-stat.js")

const tweetArmor = async (vendor, armor) => {
  let highStatArmorItems = ""

  for (const [index, item] of armor.entries()) {
    /* eslint-disable max-len */
    highStatArmorItems += `${item.class.charAt(0).toUpperCase()}${item.class.substr(1)} ${item.type}
${item.mobility}-${item.resilience}-${item.recovery}-${item.discipline}-${item.intellect}-${item.strength} (${item.total})`
    /* eslint-enable max-len */

    // Increase index by 1 to account for 0 based index
    if (index + 1 < armor.length) {
      highStatArmorItems += "\n\n"
    }
  }

  const message = `👀 High stat armor 👀

${prettyVendorNames[vendor]} is selling:

${highStatArmorItems}

Mob-Res-Rec-Dis-Int-Str

#Destiny2 #TwitterBot`

  await tweet(message)
  return message
}

module.exports.highStatLegendaryArmor = async (vendor) => {
  console.log(`highStatLegendaryArmor called for ${vendor}`)
  let result
  const { inventory: { armor } } = await getVendorInventory(vendor)
  const currentInventory = [...armor]
  const legendaryArmor = currentInventory.filter((item) => item.type.startsWith("Legendary"))

  const wellRolledArmor = []
  for (const item of legendaryArmor) {
    if (isArmorHighStat(item)) {
      wellRolledArmor.push(item)
    }
  }
  const currentInventoryForCompare = getCompareStrings(wellRolledArmor)
  const lastSoldItems = await getLastSoldItems(vendor, 7)
  // Looking for - in the roll finds armor as armor are - separated
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

    const titanHighStatArmor = wellRolledArmor.filter((armor) => armor.class === "titan")
    const hunterHighStatArmor = wellRolledArmor.filter((armor) => armor.class === "hunter")
    const warlockHighStatArmor = wellRolledArmor.filter((armor) => armor.class === "warlock")
    result = "Tweeted:"
    if (titanHighStatArmor.length > 0) {
      result += `\n\n${await tweetArmor(vendor, titanHighStatArmor)}`
    }
    if (hunterHighStatArmor.length > 0) {
      result += `\n\n${await tweetArmor(vendor, hunterHighStatArmor)}`
    }
    if (warlockHighStatArmor.length > 0) {
      result += `\n\n${await tweetArmor(vendor, warlockHighStatArmor)}`
    }
  } else {
    result = `New ${prettyVendorNames[vendor]} legendary high stat armor tweet is not ready`
  }
  return result
}
