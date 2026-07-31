import { useCallback, useState } from 'react'

export function useTransactionsModal() {
  const [modalData, setModalData] = useState(null)

  const openTransactionsModal = useCallback((data) => setModalData(data), [])
  const closeTransactionsModal = useCallback(() => setModalData(null), [])

  return { modalData, openTransactionsModal, closeTransactionsModal }
}
