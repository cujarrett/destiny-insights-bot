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
    TableName: "destiny-insights-mods",
    FilterExpression: "#ts > :startDate and #modName = :name",
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

module.exports.getLastSoldAda1Mods = async () => {
  console.log("getLastSoldAda1Mods called")
  AWS.config.update({ region: "us-east-1" })
  const ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" })
  const responses = []
  const oneDayAgo = new Date(new Date().getTime() - (24 * 60 * 60 * 1000)).toISOString()

  const query = {
    TableName: "destiny-insights-mods",
    FilterExpression: "#ts > :startDate AND (#type = :armorType OR #type = :combatSyleType)",
    ExpressionAttributeValues: {
      // AWS DynamoDB uses single char for types
      // eslint-disable-next-line id-length
      ":startDate": { S: oneDayAgo },
      // eslint-disable-next-line id-length
      ":armorType": { S: "Armor Mod" },
      // eslint-disable-next-line id-length
      ":combatSyleType": { S: "Combat Style Mod" }
    },
    ExpressionAttributeNames: {
      "#ts": "timestamp",
      "#type": "type"
    }
  }

  const response = await ddb.scan(query).promise()
  responses.push(...response.Items)

  const results = []
  for (const sale of responses) {
    results.push({
      timestamp: sale.timestamp.S,
      name: sale.name.S,
      type: sale.type.S
    })
  }

  const sortedResults = results.sort((first, second) => {
    return new Date(first.timestamp) - new Date(second.timestamp)
  })

  return sortedResults
}

module.exports.getLastSoldBanshee44Mods = async () => {
  console.log("getLastSoldBanshee44Mods called")
  AWS.config.update({ region: "us-east-1" })
  const ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" })
  const responses = []
  const oneDayAgo = new Date(new Date().getTime() - (24 * 60 * 60 * 1000)).toISOString()

  const query = {
    TableName: "destiny-insights-mods",
    FilterExpression: "#ts > :startDate AND #type = :weaponType",
    ExpressionAttributeValues: {
      // AWS DynamoDB uses single char for types
      // eslint-disable-next-line id-length
      ":startDate": { S: oneDayAgo },
      // eslint-disable-next-line id-length
      ":weaponType": { S: "Weapon Mod" }
    },
    ExpressionAttributeNames: {
      "#ts": "timestamp",
      "#type": "type"
    }
  }

  const response = await ddb.scan(query).promise()
  responses.push(...response.Items)

  const results = []
  for (const sale of responses) {
    results.push({
      timestamp: sale.timestamp.S,
      name: sale.name.S,
      type: sale.type.S
    })
  }

  const sortedResults = results.sort((first, second) => {
    return new Date(first.timestamp) - new Date(second.timestamp)
  })

  return sortedResults
}

module.exports.addMod = async (mod, timestamp) => {
  console.log("addMod called")
  let type = mod.type
  if (type.includes("Armor")) {
    type = "Armor Mod"
  } else if (type === "Legendary Weapon Mod") {
    type = "Weapon Mod"
  } else if (type === "Common Charged with Light Mod" || type === "Common Warmind Cell Mod") {
    type = "Combat Style Mod"
  }

  AWS.config.update({ region: "us-east-1" })
  const ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" })

  const params = {
    TableName: "destiny-insights-mods",
    Item: {
      // AWS DynamoDB uses single char for types
      // eslint-disable-next-line id-length
      key: { S: `${timestamp} (${mod.itemHash})` },
      // eslint-disable-next-line id-length
      timestamp: { S: timestamp },
      // eslint-disable-next-line id-length
      type: { S: type },
      // eslint-disable-next-line id-length
      name: { S: mod.name }
    }
  }

  await ddb.putItem(params).promise()
}

module.exports.getLastSoldXurItems = async () => {
  console.log("getLastSoldXurItems called")
  AWS.config.update({ region: "us-east-1" })
  const ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" })
  const responses = []
  const oneWeekAgo = new Date(new Date().getTime() - (7 * 24 * 60 * 60 * 1000)).toISOString()

  const query = {
    TableName: "destiny-insights-xur",
    FilterExpression: "#ts > :startDate",
    ExpressionAttributeValues: {
      // AWS DynamoDB uses single char for types
      // eslint-disable-next-line id-length
      ":startDate": { S: oneWeekAgo }
    },
    ExpressionAttributeNames: {
      "#ts": "timestamp"
    }
  }

  const response = await ddb.scan(query).promise()
  responses.push(...response.Items)

  const results = []
  for (const sale of responses) {
    results.push({
      timestamp: sale.timestamp.S,
      name: sale.name.S,
      type: sale.type.S
    })
  }

  const sortedResults = results.sort((first, second) => {
    return new Date(second.timestamp) - new Date(first.timestamp)
  })

  return sortedResults
}

module.exports.addXurItem = async (item, timestamp) => {
  console.log("addXurItem called")
  const { itemHash, type, name } = item
  AWS.config.update({ region: "us-east-1" })
  const ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" })

  const params = {
    TableName: "destiny-insights-xur",
    Item: {
      // AWS DynamoDB uses single char for types
      // eslint-disable-next-line id-length
      key: { S: `${timestamp} (${itemHash})` },
      // eslint-disable-next-line id-length
      timestamp: { S: timestamp },
      // eslint-disable-next-line id-length
      type: { S: type },
      // eslint-disable-next-line id-length
      name: { S: name }
    }
  }

  try {
    await ddb.putItem(params).promise()
  } catch (error) {
    console.log(error)
  }
}
