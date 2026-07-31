import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useAuth } from './useAuth'

export function useBudgets() {
  const { user } = useAuth()
  const [budgets, setBudgets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchBudgets = useCallback(async () => {
    if (!user) return

    const { data, error: fetchError } = await supabase
      .from('budgets')
      .select('*, category:categories(id, name, type, color, icon)')
      .order('year', { ascending: false })
      .order('month', { ascending: false })

    if (fetchError) {
      setError(fetchError.message)
    } else {
      setBudgets(data)
      setError(null)
    }
    setLoading(false)
  }, [user])

  useEffect(() => {
    // Fetch-on-mount: patrón estándar de React, la regla experimental de
    // React Compiler lo marca aunque no cause renders en cascada aquí.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchBudgets()
  }, [fetchBudgets])

  const upsertBudget = useCallback(
    async ({ categoryId, year, month, amount }) => {
      const { error: upsertError } = await supabase
        .from('budgets')
        .upsert(
          { user_id: user.id, category_id: categoryId, year, month, amount },
          { onConflict: 'user_id,category_id,year,month' },
        )
      if (upsertError) throw upsertError
      await fetchBudgets()
    },
    [user, fetchBudgets],
  )

  const updateBudget = useCallback(
    async (id, { categoryId, year, month, amount }) => {
      const { error: updateError } = await supabase
        .from('budgets')
        .update({ category_id: categoryId, year, month, amount })
        .eq('id', id)
      if (updateError) throw updateError
      await fetchBudgets()
    },
    [fetchBudgets],
  )

  const deleteBudget = useCallback(
    async (id) => {
      const { error: deleteError } = await supabase.from('budgets').delete().eq('id', id)
      if (deleteError) throw deleteError
      await fetchBudgets()
    },
    [fetchBudgets],
  )

  return {
    budgets,
    loading,
    error,
    upsertBudget,
    updateBudget,
    deleteBudget,
    refetch: fetchBudgets,
  }
}
