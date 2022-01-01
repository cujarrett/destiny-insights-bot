const AWS = require("aws-sdk")

module.exports.getModSalesInLastYear = async (mod) => {
  console.log("getModSalesInLastYear called")
  AWS.config.update({ region: "us-east-1" })
  const ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" })
  const responses = []

  let oneYearAgo = new Date()
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)
  // eslint-disable-next-line newline-per-chained-call
  oneYearAgo = oneYearAgo.toISOString().split("T")[0]

  const query = {
    TableName: "destiny-insights-items",
    FilterExpression: "#ts > :startDate AND #modName = :name",
    ExpressionAttributeValues: {
      // AWS DynamoDB uses single char for types
      // eslint-disable-next-line id-length
      ":startDate": { S: oneYearAgo },
      // eslint-disable-next-line id-length
      ":name": { S: mod.name }
    },
    ExpressionAttributeNames: {
      "#ts": "timestamp",
      "#modName": "name"
    }
  }

  const response = await ddb.scan(query).promise()
  responses.push(...response.Items)

  const results = []
  for (const tweet of responses) {
    results.push(new Date(tweet.timestamp.S))
  }

  const sortedResults = results.sort((first, second) => {
    return new Date(second) - new Date(first)
  })

  return sortedResults
}

module.exports.getLastSoldItems = async (source) => {
  console.log("getLastSoldItems called")
  AWS.config.update({ region: "us-east-1" })
  const ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" })
  const responses = []
  const oneDayAgo = new Date(new Date().getTime() - (24 * 60 * 60 * 1000)).toISOString()

  const query = {
    TableName: "destiny-insights-items",
    FilterExpression: "#ts > :startDate AND #s = :source",
    ExpressionAttributeValues: {
      // AWS DynamoDB uses single char for types
      // eslint-disable-next-line id-length
      ":startDate": { S: oneDayAgo },
      // eslint-disable-next-line id-length
      ":source": { S: source }
    },
    ExpressionAttributeNames: {
      "#ts": "timestamp",
      "#s": "source"
    }
  }

  const response = await ddb.scan(query).promise()
  responses.push(...response.Items)

  const results = []
  for (const sale of responses) {
    results.push({
      timestamp: sale.timestamp.S,
      name: sale.name.S,
      type: sale.type.S,
      source: sale.source.S,
      roll: sale.roll?.S || ""
    })
  }

  const sortedResults = results.sort((first, second) => {
    return new Date(first.timestamp) - new Date(second.timestamp)
  })

  return sortedResults
}

module.exports.addItem = async (item, timestamp) => {
  console.log("addItem called")
  console.log(item)
  let type = item.type
  if (type.includes("Mod") && type.includes("Armor")) {
    type = "Armor Mod"
  } else if (type === "Legendary Weapon Mod") {
    type = "Weapon Mod"
  } else if (type === "Common Charged with Light Mod" || type === "Common Warmind Cell Mod") {
    type = "Combat Style Mod"
  }

  AWS.config.update({ region: "us-east-1" })
  const ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" })

  const params = {
    TableName: "destiny-insights-items",
    Item: {
      // AWS DynamoDB uses single char for types
      // eslint-disable-next-line id-length
      key: { S: `${timestamp} (${item.itemHash})` },
      // eslint-disable-next-line id-length
      timestamp: { S: timestamp },
      // eslint-disable-next-line id-length
      name: { S: item.name },
      // eslint-disable-next-line id-length
      type: { S: type },
      // eslint-disable-next-line id-length
      source: { S: item.source },
      // eslint-disable-next-line id-length
      roll: { S: item.roll }
    }

  }

  if (!item.roll) {
    delete params.Item.roll
  }

  await ddb.putItem(params).promise()
}
