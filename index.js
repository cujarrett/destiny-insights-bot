const { name, version } = require("./package.json")
const { mods } = require("./src/tweet-types/mods.js")
const { xur } = require("./src/tweet-types/xur.js")

exports.handler = async (event, context, callback) => {
  console.log(`${name} ${version} called`)

  let modsResult
  let xurResult
  try {
    modsResult = await mods()
    console.log({ modsResult })
  } catch (error) {
    console.log(error)
  }

  try {
    xurResult = await xur()
    console.log({ xurResult })
  } catch (error) {
    console.log(error)
  }

  const result = `Completing request:
${modsResult}

${xurResult}`

  if (modsResult && xurResult) {
    callback(null, { statusCode: 200, body: result })
  } else {
    callback(new Error(result), { statusCode: 500, body: result })
  }

  context.callbackWaitsForEmptyEventLoop = false
  return result
}
