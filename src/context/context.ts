import { createContext } from 'react'
import { goBackButtonTitles } from '../layout/Header/Header'

type ThemeContextType = {
  goBackButtonTitle: goBackButtonTitles
  setGoBackButtonTitle: (title: goBackButtonTitles) => void
  title: string
  setTitle: (title: string) => void
}
const DefaultState = {
  goBackButtonTitle: goBackButtonTitles.none,
  setGoBackButtonTitle: () => undefined,
  title: 'Loading...',
  setTitle: () => undefined,
}
export const HeaderContext = createContext<ThemeContextType>(DefaultState)
