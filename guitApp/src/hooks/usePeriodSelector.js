import { useState } from 'react'
import dayjs from 'dayjs'
import { monthKey } from '../lib/dateHelpers'

export function usePeriodSelector(availableMonths, availableYears) {
  const [periodMode, setPeriodMode] = useState('month')
  const [selectedMonthKey, setSelectedMonthKey] = useState(null)
  const [selectedYear, setSelectedYear] = useState(null)

  const now = dayjs()
  const fallbackMonth = {
    key: monthKey(now.year(), now.month() + 1),
    year: now.year(),
    month: now.month() + 1,
    label: 'este mes',
  }

  const activeMonthEntry =
    availableMonths.find((entry) => entry.key === selectedMonthKey) ?? availableMonths[0] ?? fallbackMonth
  const activeYear = selectedYear ?? availableYears[0]?.year ?? now.year()

  const activePeriod =
    periodMode === 'month'
      ? { year: activeMonthEntry.year, month: activeMonthEntry.month, label: activeMonthEntry.label }
      : { year: activeYear, month: null, label: String(activeYear) }

  return {
    periodMode,
    setPeriodMode,
    availableMonths,
    availableYears,
    activeMonthEntry,
    activeYear,
    setSelectedMonthKey,
    setSelectedYear,
    activePeriod,
  }
}
