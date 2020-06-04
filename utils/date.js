const generateTodayDate = (includeHour = true) => {
  const date = new Date()
  const y = date.getFullYear()
  const m = ('0' + (date.getMonth() + 1)).slice(-2)
  const d = ('0' + date.getDate()).slice(-2)
  const h = ('0' + date.getHours()).slice(-2)
  const mn = ('0' + date.getMinutes()).slice(-2)

  if (includeHour) {
    return `${y}-${m}-${d} ${h}:${mn}`
  }

  return `${y}-${m}-${d}`
}

const parseNormalDate = dateStr => {
  let date = new Date(dateStr)
  const y = date.getFullYear()
  const m = ('0' + (date.getMonth() + 1)).slice(-2)
  const d = ('0' + date.getDate()).slice(-2)

  return `${y}-${m}-${d}`
}

const equalDate = (d1, d2) => {
  let d1Parser = parseNormalDate(d1)
  let d2Parser = parseNormalDate(d2)

  return d1Parser === d2Parser
}

const getLastDayWeek = () => {
  let today = generateTodayDate(false)
  let date = new Date(today)
  unitAdd = 6 - date.getDay()
  date.setDate(date.getDate() + unitAdd)

  return date
}

const getFristDayWeek = () => {
  let today = generateTodayDate(false)
  let date = new Date(today)
  unitAdd = 1 - date.getDay()
  date.setDate(date.getDate() + unitAdd)

  return date
}

const getFristDayLastWeek = () => {
  let today = generateTodayDate(false)
  let date = new Date(today)
  unitAdd = 1 - date.getDay()
  date.setDate(date.getDate() + unitAdd - 7)

  return date
}

const isGreaterThan = (d1, d2, includeEquare = false) => {
  d1 = parseNormalDate(d1)
  d2 = parseNormalDate(d2)

  return includeEquare
    ? d1.valueOf() - d2.valueOf() >= 0
    : d1.valueOf() - d2.valueOf() > 0
}

const isLessThan = (d1, d2, includeEquare = false) => {
  d1 = parseNormalDate(d1)
  d2 = parseNormalDate(d2)

  return includeEquare
    ? d2.valueOf() - d1.valueOf() >= 0
    : d2.valueOf() - d1.valueOf() > 0
}

module.exports = {
  generateTodayDate,
  parseNormalDate,
  equalDate,
  getLastDayWeek,
  getFristDayWeek,
  isGreaterThan,
  isLessThan,
  getFristDayLastWeek,
}