const { name, version } = require("./package.json")
const { mods } = require("./src/tweet-types/mods.js")
const { wishListLegendaryWeapons } = require("./src/tweet-types/wish-list-legendary-weapons")

exports.handler = async (event, context, callback) => {
  console.log(`${name} ${version} called`)

  let banshee44ModsResult
  let ada1ModsResult
  let banshee44LegendaryWeaponResults

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
    banshee44LegendaryWeaponResults = await wishListLegendaryWeapons("banshee-44")
    console.log({ banshee44LegendaryWeaponResults })
  } catch (error) {
    console.log(error)
  }

  const result = ada1ModsResult
  && banshee44ModsResult
  && banshee44LegendaryWeaponResults

  if (result) {
    callback(null, { statusCode: 200 })
  } else {
    callback(new Error("Error with automated tweets"), { statusCode: 500 })
  }

  context.callbackWaitsForEmptyEventLoop = false
  return result
}
