import { useContext, useEffect } from 'react'
import { HeaderTitleContext } from '../context/context'
import { setPageTitle } from './pageTitle'

export function setTitle(header: string, page?: string) {
  const { setTitle } = useContext(HeaderTitleContext)
  useEffect(() => {
    header && setTitle(header)
    setPageTitle(page || header)
  }, [header, page])
}
