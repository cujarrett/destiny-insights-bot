module.exports.isArmorWellRolled = (armor) => {
  console.log("isArmorWellRolled called")
  if (armor.total > 60) {
    const { mobility, resilience, recovery, discipline, intellect, strength } = armor
    const values = [mobility, resilience, recovery, discipline, intellect, strength]
    values.sort((first, second) => second - first)
    if (values[0] > 18 && values[1] > 18) {
      return true
    }
  }
  return false
}
