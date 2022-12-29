import { useContext, useEffect } from 'react'
import { HeaderContext } from '../context/context'
import { setPageTitle } from '../services/pageTitle'

export function useSetHeaderTitle(header: string, page?: string) {
  const { setTitle } = useContext(HeaderContext)
  useEffect(() => {
    header && setTitle(header)
    setPageTitle(page || header)
  }, [header, page])
}
