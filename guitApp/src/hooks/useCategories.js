import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { DEFAULT_CATEGORIES } from '../lib/categories'
import { useAuth } from './useAuth'

export function useCategories() {
  const { user } = useAuth()
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchCategories = useCallback(async () => {
    if (!user) return

    const { data, error: fetchError } = await supabase
      .from('categories')
      .select('*')
      .order('name')

    if (fetchError) {
      setError(fetchError.message)
      setLoading(false)
      return
    }

    if (data.length === 0) {
      const seeded = DEFAULT_CATEGORIES.map((category) => ({ ...category, user_id: user.id }))
      // upsert + ignoreDuplicates (junto con el constraint único en la BD) evita
      // filas repetidas si este efecto llega a dispararse más de una vez
      // (por ejemplo, con React StrictMode en desarrollo).
      const { error: seedError } = await supabase
        .from('categories')
        .upsert(seeded, { onConflict: 'user_id,name', ignoreDuplicates: true })

      if (seedError) {
        setError(seedError.message)
        setLoading(false)
        return
      }

      const { data: refreshed, error: refetchError } = await supabase
        .from('categories')
        .select('*')
        .order('name')

      if (refetchError) {
        setError(refetchError.message)
        setLoading(false)
        return
      }

      setCategories(refreshed)
      setError(null)
      setLoading(false)
      return
    }

    setCategories(data)
    setError(null)
    setLoading(false)
  }, [user])

  useEffect(() => {
    // Fetch-on-mount: patrón estándar de React, la regla experimental de
    // React Compiler lo marca aunque no cause renders en cascada aquí.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchCategories()
  }, [fetchCategories])

  const addCategory = useCallback(
    async ({ name, type, color }) => {
      const { error: insertError } = await supabase
        .from('categories')
        .insert({ name, type, color, user_id: user.id })
      if (insertError) throw insertError
      await fetchCategories()
    },
    [user, fetchCategories],
  )

  const deleteCategory = useCallback(
    async (id) => {
      const { error: deleteError } = await supabase.from('categories').delete().eq('id', id)
      if (deleteError) throw deleteError
      await fetchCategories()
    },
    [fetchCategories],
  )

  return { categories, loading, error, addCategory, deleteCategory, refetch: fetchCategories }
}
