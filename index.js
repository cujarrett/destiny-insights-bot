const { name, version } = require("./package.json")
const { mods } = require("./src/tweet-types/mods.js")
const { xurExotics } = require("./src/tweet-types/xur-exotics")
const { highStatLegendaryArmor } = require("./src/tweet-types/high-stat-legendary-armor.js")

exports.handler = async (event, context, callback) => {
  console.log(`${name} ${version} called`)

  let modsResult
  let xurExoticsResult
  let ada1LegendaryArmorResults
  let theDrifterLegendaryArmorResults
  let commanderZavalaLegendaryArmorResults
  let lordShaxxLegendaryArmorResults
  let devrimKayLegendaryArmorResults
  let failsafeLegendaryArmorResults
  let xurLegendaryArmorResults

  try {
    modsResult = await mods()
    console.log({ modsResult })
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

  const result = modsResult
  && xurExoticsResult
  && ada1LegendaryArmorResults
  && theDrifterLegendaryArmorResults
  && commanderZavalaLegendaryArmorResults
  && lordShaxxLegendaryArmorResults
  && devrimKayLegendaryArmorResults
  && failsafeLegendaryArmorResults
  && xurLegendaryArmorResults

  if (result) {
    callback(null, { statusCode: 200 })
  } else {
    callback(new Error("Error with automated tweets"), { statusCode: 500 })
  }

  context.callbackWaitsForEmptyEventLoop = false
  return result
}
