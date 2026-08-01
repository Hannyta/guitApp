import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { DEFAULT_CURRENCY } from '../lib/currency'
import { useAuth } from './useAuth'

export function useAccounts() {
  const { user } = useAuth()
  const [accounts, setAccounts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchAccounts = useCallback(async () => {
    if (!user) return

    const { data, error: fetchError } = await supabase.from('accounts').select('*').order('name')

    if (fetchError) {
      setError(fetchError.message)
      setLoading(false)
      return
    }

    if (data.length === 0 && user.user_metadata?.onboarded) {
      const seeded = [
        {
          name: 'Efectivo',
          currency: user.user_metadata?.currency ?? DEFAULT_CURRENCY,
          color: '#2a78d6',
          icon: 'cash',
          user_id: user.id,
        },
      ]
      // upsert + ignoreDuplicates (junto con el constraint único en la BD) evita
      // filas repetidas si este efecto llega a dispararse más de una vez
      // (por ejemplo, con React StrictMode en desarrollo).
      const { error: seedError } = await supabase
        .from('accounts')
        .upsert(seeded, { onConflict: 'user_id,name', ignoreDuplicates: true })

      if (seedError) {
        setError(seedError.message)
        setLoading(false)
        return
      }

      const { data: refreshed, error: refetchError } = await supabase
        .from('accounts')
        .select('*')
        .order('name')

      if (refetchError) {
        setError(refetchError.message)
        setLoading(false)
        return
      }

      setAccounts(refreshed)
      setError(null)
      setLoading(false)
      return
    }

    setAccounts(data)
    setError(null)
    setLoading(false)
  }, [user])

  useEffect(() => {
    // Fetch-on-mount: patrón estándar de React, la regla experimental de
    // React Compiler lo marca aunque no cause renders en cascada aquí.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchAccounts()
  }, [fetchAccounts])

  const addAccount = useCallback(
    async ({ name, currency, color, icon }) => {
      const { data, error: insertError } = await supabase
        .from('accounts')
        .insert({ name, currency, color, icon, user_id: user.id })
        .select()
        .single()
      if (insertError) throw insertError
      await fetchAccounts()
      return data
    },
    [user, fetchAccounts],
  )

  const updateAccount = useCallback(
    async (id, { name, currency, color, icon }) => {
      const { error: updateError } = await supabase
        .from('accounts')
        .update({ name, currency, color, icon })
        .eq('id', id)
      if (updateError) throw updateError
      await fetchAccounts()
    },
    [fetchAccounts],
  )

  const deleteAccount = useCallback(
    async (id) => {
      const { error: deleteError } = await supabase.from('accounts').delete().eq('id', id)
      if (deleteError) throw deleteError
      await fetchAccounts()
    },
    [fetchAccounts],
  )

  return { accounts, loading, error, addAccount, updateAccount, deleteAccount, refetch: fetchAccounts }
}
