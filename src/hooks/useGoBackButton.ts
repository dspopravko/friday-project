import { goBackButtonTitles } from '../layout/Header/Header'
import { useContext, useEffect } from 'react'
import { HeaderContext } from '../context/context'

export const useGoBackButton = (button: goBackButtonTitles) => {
  const { setGoBackButtonTitle } = useContext(HeaderContext)
  useEffect(() => {
    setGoBackButtonTitle(button)
    return () => setGoBackButtonTitle(goBackButtonTitles.none)
  }, [])
}
