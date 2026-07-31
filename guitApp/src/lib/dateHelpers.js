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

function monthLabel(year, month) {
  const label = dayjs(`${year}-${month}-01`).format('MMMM YYYY')
  return label[0].toUpperCase() + label.slice(1)
}

export function uniqueMonths(pairs) {
  const byKey = new Map()
  pairs.forEach(({ year, month }) => {
    const key = monthKey(year, month)
    if (!byKey.has(key)) {
      byKey.set(key, { key, year, month, label: monthLabel(year, month) })
    }
  })
  return Array.from(byKey.values()).sort((a, b) => (a.year !== b.year ? b.year - a.year : b.month - a.month))
}

export function uniqueYears(years) {
  return Array.from(new Set(years))
    .sort((a, b) => b - a)
    .map((year) => ({ year, label: String(year) }))
}

export function availableMonthsFromTransactions(transactions) {
  return uniqueMonths(
    transactions.map((transaction) => {
      const date = dayjs(transaction.occurred_on)
      return { year: date.year(), month: date.month() + 1 }
    }),
  )
}

export function availableYearsFromTransactions(transactions) {
  return uniqueYears(transactions.map((transaction) => dayjs(transaction.occurred_on).year()))
}

export function availableMonthsFromBudgets(budgets) {
  return uniqueMonths(budgets.map((budget) => ({ year: budget.year, month: budget.month })))
}

export function availableYearsFromBudgets(budgets) {
  return uniqueYears(budgets.map((budget) => budget.year))
}
