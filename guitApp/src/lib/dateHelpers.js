import dayjs from 'dayjs'

export function lastNMonths(n) {
  const now = dayjs()
  return Array.from({ length: n }, (_, index) => now.subtract(n - 1 - index, 'month')).map(
    (date) => ({ year: date.year(), month: date.month() + 1, label: date.format('MMM YY') }),
  )
}

export function isSameMonth(dateString, year, month) {
  const date = dayjs(dateString)
  return date.year() === year && date.month() + 1 === month
}

/** Matches by year, and by month too when month is not null/undefined (whole-year mode). */
export function isInPeriod(dateString, year, month) {
  const date = dayjs(dateString)
  if (date.year() !== year) return false
  return month == null || date.month() + 1 === month
}

export function monthKey(year, month) {
  return `${year}-${month}`
}

export function availableMonthsFromTransactions(transactions) {
  const monthsByKey = new Map()

  transactions.forEach((transaction) => {
    const date = dayjs(transaction.occurred_on)
    const year = date.year()
    const month = date.month() + 1
    const key = monthKey(year, month)
    if (!monthsByKey.has(key)) {
      const label = date.format('MMMM YYYY')
      monthsByKey.set(key, { key, year, month, label: label[0].toUpperCase() + label.slice(1) })
    }
  })

  return Array.from(monthsByKey.values()).sort((a, b) =>
    a.year !== b.year ? b.year - a.year : b.month - a.month,
  )
}

export function availableYearsFromTransactions(transactions) {
  const years = new Set()
  transactions.forEach((transaction) => years.add(dayjs(transaction.occurred_on).year()))
  return Array.from(years)
    .sort((a, b) => b - a)
    .map((year) => ({ year, label: String(year) }))
}
