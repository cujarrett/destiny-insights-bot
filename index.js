const { name, version } = require("./package.json")
const { ada1 } = require("./src/tweet-types/ada-1")
const { banshee44 } = require("./src/tweet-types/banshee-44")
const { xur } = require("./src/tweet-types/xur.js")

exports.handler = async (event, context, callback) => {
  console.log(`${name} ${version} called`)

  let ada1Result
  let banshee44Result
  let xurResult

  try {
    ada1Result = await ada1()
    console.log({ ada1Result })
  } catch (error) {
    console.log(error)
  }

  try {
    banshee44Result = await banshee44()
    console.log({ banshee44Result })
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
${ada1Result}

${banshee44Result}

${xurResult}`

  if (ada1Result && banshee44Result && xurResult) {
    callback(null, { statusCode: 200, body: result })
  } else {
    callback(new Error(result), { statusCode: 500, body: result })
  }

  context.callbackWaitsForEmptyEventLoop = false
  return result
}
