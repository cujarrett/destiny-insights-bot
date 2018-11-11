module.exports.formatTime = (timeInMilliseconds) => {
  const wholeSeconds = Math.floor(timeInMilliseconds / 1000)
  if (wholeSeconds > 0) {
    const remainingMilliseconds = Math.floor(timeInMilliseconds % 1000)
    return `${wholeSeconds} seconds ${remainingMilliseconds} milliseconds`
  }
  return `${Math.floor(timeInMilliseconds)} milliseconds`
}
