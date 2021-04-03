const AWS = require("aws-sdk")
const ssm = new AWS.SSM({ region: "us-east-1" })

module.exports.getParameters = async () => {
  const params = {
    Path: "/destiny-insights-bot/",
    Recursive: false,
    WithDecryption: true
  }
  const { Parameters: parameters } = await ssm.getParametersByPath(params).promise()
  const formattedParameters = {}

  for (const parameter of parameters) {
    const fullName = parameter.Name
    const endOfPathIndex = fullName.indexOf(params.Path) + params.Path.length
    const name = fullName.substring(endOfPathIndex)
    const value = parameter.Value
    formattedParameters[name] = value
  }
  return formattedParameters
}
