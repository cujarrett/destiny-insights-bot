const AWS = require("aws-sdk")

module.exports.getSecret = async () => {
  try {
    const region = "us-east-1"
    const client = new AWS.SecretsManager({ region })
    const response = await client.getSecretValue({ SecretId: "banshee-44-mods-bot" }).promise()
    const secret = JSON.parse(response.SecretString)
    return secret
  } catch (error) {
    console.log(error)
  }
}
