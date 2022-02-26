const { name, version } = require("./package.json")
const { highStatLegendaryArmor } = require("./src/tweet-types/high-stat-legendary-armor.js")
const { mods } = require("./src/tweet-types/mods.js")
const { xurExotics } = require("./src/tweet-types/xur-exotics")
const { wishListWeapons } = require("./src/tweet-types/wish-list-weapons")

exports.handler = async (event, context, callback) => {
  console.log(`${name} ${version} called`)

  let banshee44ModsResult
  let ada1ModsResult
  let xurExoticsResult
  let banshee44WeaponResults
  let xurWeaponResults
  let xurLegendaryArmorResults
  let ada1LegendaryArmorResults
  let theDrifterLegendaryArmorResults
  let commanderZavalaLegendaryArmorResults
  let lordShaxxLegendaryArmorResults
  let devrimKayLegendaryArmorResults
  let failsafeLegendaryArmorResults

  try {
    banshee44ModsResult = await mods("banshee-44")
    console.log({ banshee44ModsResult })
  } catch (error) {
    console.log(error)
  }

  try {
    ada1ModsResult = await mods("ada-1")
    console.log({ ada1ModsResult })
  } catch (error) {
    console.log(error)
  }

  try {
    xurExoticsResult = await xurExotics()
    console.log({ xurExoticsResult })
  } catch (error) {
    console.log(error)
  }

  try {
    banshee44WeaponResults = await wishListWeapons("banshee-44")
    console.log({ banshee44WeaponResults })
  } catch (error) {
    console.log(error)
  }

  try {
    xurWeaponResults = await wishListWeapons("xur")
    console.log({ xurWeaponResults })
  } catch (error) {
    console.log(error)
  }

  try {
    xurLegendaryArmorResults = await highStatLegendaryArmor("xur")
    console.log({ xurLegendaryArmorResults })
  } catch (error) {
    console.log(error)
  }

  try {
    ada1LegendaryArmorResults = await highStatLegendaryArmor("ada-1")
    console.log({ ada1LegendaryArmorResults })
  } catch (error) {
    console.log(error)
  }

  try {
    theDrifterLegendaryArmorResults = await highStatLegendaryArmor("the-drifter")
    console.log({ theDrifterLegendaryArmorResults })
  } catch (error) {
    console.log(error)
  }

  try {
    commanderZavalaLegendaryArmorResults = await highStatLegendaryArmor("commander-zavala")
    console.log({ commanderZavalaLegendaryArmorResults })
  } catch (error) {
    console.log(error)
  }

  try {
    lordShaxxLegendaryArmorResults = await highStatLegendaryArmor("lord-shaxx")
    console.log({ lordShaxxLegendaryArmorResults })
  } catch (error) {
    console.log(error)
  }

  try {
    devrimKayLegendaryArmorResults = await highStatLegendaryArmor("devrim-kay")
    console.log({ devrimKayLegendaryArmorResults })
  } catch (error) {
    console.log(error)
  }

  try {
    failsafeLegendaryArmorResults = await highStatLegendaryArmor("failsafe")
    console.log({ failsafeLegendaryArmorResults })
  } catch (error) {
    console.log(error)
  }

  const result = banshee44ModsResult
  && ada1ModsResult
  && banshee44WeaponResults
  && xurWeaponResults
  && xurExoticsResult
  && xurLegendaryArmorResults
  && ada1LegendaryArmorResults
  && theDrifterLegendaryArmorResults
  && commanderZavalaLegendaryArmorResults
  && lordShaxxLegendaryArmorResults
  && devrimKayLegendaryArmorResults
  && failsafeLegendaryArmorResults

  if (result) {
    callback(null, { statusCode: 200 })
  } else {
    callback(new Error("Error with automated tweets"), { statusCode: 500 })
  }

  context.callbackWaitsForEmptyEventLoop = false
  return result
}
