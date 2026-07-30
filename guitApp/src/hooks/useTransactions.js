import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useAuth } from './useAuth'

export function useTransactions() {
  const { user } = useAuth()
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchTransactions = useCallback(async () => {
    if (!user) return

    const { data, error: fetchError } = await supabase
      .from('transactions')
      .select('*, category:categories(id, name, type, color)')
      .order('occurred_on', { ascending: false })

    if (fetchError) {
      setError(fetchError.message)
    } else {
      setTransactions(data)
      setError(null)
    }
    setLoading(false)
  }, [user])

  useEffect(() => {
    // Fetch-on-mount: patrón estándar de React, la regla experimental de
    // React Compiler lo marca aunque no cause renders en cascada aquí.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchTransactions()
  }, [fetchTransactions])

  const addTransaction = useCallback(
    async ({ categoryId, type, amount, description, occurredOn }) => {
      const { error: insertError } = await supabase.from('transactions').insert({
        user_id: user.id,
        category_id: categoryId,
        type,
        amount,
        description,
        occurred_on: occurredOn,
      })
      if (insertError) throw insertError
      await fetchTransactions()
    },
    [user, fetchTransactions],
  )

  const updateTransaction = useCallback(
    async (id, { categoryId, type, amount, description, occurredOn }) => {
      const { error: updateError } = await supabase
        .from('transactions')
        .update({
          category_id: categoryId,
          type,
          amount,
          description,
          occurred_on: occurredOn,
        })
        .eq('id', id)
      if (updateError) throw updateError
      await fetchTransactions()
    },
    [fetchTransactions],
  )

  const deleteTransaction = useCallback(
    async (id) => {
      const { error: deleteError } = await supabase.from('transactions').delete().eq('id', id)
      if (deleteError) throw deleteError
      await fetchTransactions()
    },
    [fetchTransactions],
  )

  return {
    transactions,
    loading,
    error,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    refetch: fetchTransactions,
  }
}
