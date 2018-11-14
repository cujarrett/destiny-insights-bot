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
    const currentTime = moment().format("hh:mm a")

    console.log({currentTime})

    // if (currentTime === "11:02 am") {
      const { mods } = await braytech.getModsForSale()
      const [firstMod, secondMod] = mods
      // TODO remove timestamp for server side testing
      const timestamp = moment().format("YYYY-DD-MM, hh:mm:ss a")
      // Allow tweet to be longer than 100 characters
      // eslint-disable-next-line max-len
      const message = `${timestamp} Banshee-44 is selling ${firstMod} and ${secondMod} today. #Destiny2 #TwitterBot`
      twitter.post(message)
    // }
  } catch (error) {
    const timestamp = moment().format("YYYY-DD-MM, hh:mm:ss a")
    console.log(`${timestamp} - ${error}`)
  }
}

tweetBot()
