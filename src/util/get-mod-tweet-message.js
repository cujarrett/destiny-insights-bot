module.exports.getModTweetMessage = (mod, modDetails) => {
  let message = `${mod}
- ${modDetails.soldCountMessage}
- ${modDetails.soldRateMessage}`

  if (modDetails.lastSoldDateMessage) {
    message += `\n- ${modDetails.lastSoldDateMessage}`
  }

  return message
}
