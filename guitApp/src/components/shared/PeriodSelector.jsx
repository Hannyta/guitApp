export function PeriodSelector({ period }) {
  const {
    periodMode,
    setPeriodMode,
    availableMonths,
    availableYears,
    activeMonthEntry,
    activeYear,
    setSelectedMonthKey,
    setSelectedYear,
  } = period

  return (
    <div className="period-selector">
      <div className="type-toggle period-toggle">
        <button
          type="button"
          className={periodMode === 'month' ? 'active' : ''}
          onClick={() => setPeriodMode('month')}
        >
          Mes
        </button>
        <button
          type="button"
          className={periodMode === 'year' ? 'active' : ''}
          onClick={() => setPeriodMode('year')}
        >
          Año
        </button>
      </div>

      {periodMode === 'month' ? (
        <label className="month-select-label">
          Mes
          <select
            value={activeMonthEntry.key}
            onChange={(event) => setSelectedMonthKey(event.target.value)}
            disabled={availableMonths.length === 0}
          >
            {availableMonths.length === 0 ? (
              <option value={activeMonthEntry.key}>Sin datos todavía</option>
            ) : (
              availableMonths.map((entry) => (
                <option key={entry.key} value={entry.key}>
                  {entry.label}
                </option>
              ))
            )}
          </select>
        </label>
      ) : (
        <label className="month-select-label">
          Año
          <select
            value={activeYear}
            onChange={(event) => setSelectedYear(Number(event.target.value))}
            disabled={availableYears.length === 0}
          >
            {availableYears.length === 0 ? (
              <option value={activeYear}>Sin datos todavía</option>
            ) : (
              availableYears.map((entry) => (
                <option key={entry.year} value={entry.year}>
                  {entry.label}
                </option>
              ))
            )}
          </select>
        </label>
      )}
    </div>
  )
}
