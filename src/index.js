const express = require("express")
const fetch = require("node-fetch")
const moment = require("moment")
const momentTimezone = require("moment-timezone")
const braytech = require("./integrations/braytech.js")
const twitter = require("./integrations/twitter.js")

const port = process.env.PORT || 3000
const app = express()

app.listen(port, () => {
  // Allow server side logging
  // eslint-disable-next-line no-console
  console.log(`Server started on port ${port}`)
})

const tweetBot = async () => {
  momentTimezone.tz.setDefault("America/Chicago")

  try {
    setInterval(async () => {
      const currentTime = moment().format("hh:mm a")
      const timestamp = moment().format("YYYY-DD-MM, hh:mm:ss a")

      if (currentTime === "11:01 am") {
        const { mods } = await braytech.getModsForSale()
        const [firstMod, secondMod] = mods
        // Allow tweet to be longer than 100 characters
        // eslint-disable-next-line max-len
        const message = `${timestamp} Banshee-44 is selling ${firstMod} and ${secondMod} today. #Destiny2 #TwitterBot`
        twitter.post(message)
      }

      const minutesToRefresh = [5, 20, 35, 50]
      const currentMinutes = moment().format("mm")
      if (minutesToRefresh.contains(currentMinutes)) {
        await fetch("http://banshee-44-mods-bot.herokuapp.com")
      }

      // Allow server side logging
      // eslint-disable-next-line no-console
      console.log(`${timestamp} - banshee-44-mods-bot running`)
    }, 60 * 1000)
  } catch (error) {
    const timestamp = moment().format("YYYY-DD-MM, hh:mm:ss a")
    // Allow server side logging
    // eslint-disable-next-line no-console
    console.log(`${timestamp} - ${error}`)
  }
}

tweetBot()
