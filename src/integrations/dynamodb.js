const AWS = require("aws-sdk")

module.exports.insertData = async (mod1, mod2) => {
  AWS.config.update({ region: "us-east-1" })
  const ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" })

  const params = {
    TableName: "banshee-44-mods-bot",
    Item: {
      // AWS DynamoDB uses single char for types
      // eslint-disable-next-line id-length
      timestamp: { S: new Date().toISOString() },
      // eslint-disable-next-line id-length
      mod1: { S: mod1 },
      // eslint-disable-next-line id-length
      mod2: { S: mod2 }
    }
  }

  await ddb.putItem(params).promise()
}

const getQuery = (modNumber, mod) => {
  return {
    TableName: "banshee-44-mods-bot",
    FilterExpression: `${modNumber} = :value`,
    ExpressionAttributeValues: {
      // AWS DynamoDB uses single char for types
      // eslint-disable-next-line id-length
      ":value": { S: mod }
    }
  }
}

module.exports.deleteKey = async (key) => {
  AWS.config.update({ region: "us-east-1" })
  const ddb = new AWS.DynamoDB.DocumentClient()

  const params = {
    TableName: "banshee-44-mods-bot",
    Key: {
      timestamp: key
    }
  }

  await ddb.delete(params).promise()
}

module.exports.getDataForMod = async (mod) => {
  AWS.config.update({ region: "us-east-1" })
  const ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" })
  const responses = []
  const results = []

  const query1 = getQuery("mod1", mod)
  let response = await ddb.scan(query1).promise()
  responses.push(...response.Items)
  const query2 = getQuery("mod2", mod)
  response = await ddb.scan(query2).promise()
  responses.push(...response.Items)

  for (const tweet of responses) {
    const dropDate = new Date(tweet.timestamp.S)
    const now = new Date()
    const difference = Math.floor((now - dropDate) / (1000 * 60 * 60 * 24))

    if (difference < 366) {
      results.push({
        timestamp: tweet.timestamp.S,
        mod1: tweet.mod1.S,
        mod2: tweet.mod2.S
      })
    }
  }

  const sortedResults = results.sort((first, second) => {
    return new Date(second.timestamp) - new Date(first.timestamp)
  })

  return sortedResults
}
