const fs = require("fs")

const appVersion = JSON.parse(fs.readFileSync("package.json", "utf8")).version
console.log(`banshee-44-mods-bot ${appVersion}`)
