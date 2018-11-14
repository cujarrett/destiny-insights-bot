// const express = require("express")
// const fetch = require("node-fetch")
const moment = require("moment")
const momentTimezone = require("moment-timezone")
const braytech = require("./integrations/braytech.js")
const twitter = require("./integrations/twitter.js")

// const port = process.env.PORT || 3000
// const app = express()

// app.listen(port, () => {
//   console.log(`Server started on port ${port}`)
// })

const tweetBot = async () => {
  momentTimezone.tz.setDefault("UTC")

  try {
    const { mods } = await braytech.getModsForSale()
    const [firstMod, secondMod] = mods
    // Allow tweet to be longer than 100 characters
    // eslint-disable-next-line max-len
    const message = `Banshee-44 is selling ${firstMod} and ${secondMod} today. #Destiny2 #TwitterBot`
    twitter.post(message)
  } catch (error) {
    const timestamp = moment().format("YYYY-DD-MM, hh:mm:ss a")
    console.log(`${timestamp} - ${error}`)
  }
}

tweetBot()
