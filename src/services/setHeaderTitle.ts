import { useContext, useEffect } from 'react'
import { HeaderContext } from '../context/context'
import { setPageTitle } from './pageTitle'

export function setTitle(header: string, page?: string) {
  const { setTitle } = useContext(HeaderContext)
  useEffect(() => {
    header && setTitle(header)
    setPageTitle(page || header)
  }, [header, page])
}
