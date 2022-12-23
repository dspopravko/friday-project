import { createContext } from 'react'

type ThemeContextType = {
  goBackButtonTitle: string
  setGoBackButtonTitle: (title: string) => void
  title: string
  setTitle: (title: string) => void
}
const DefaultState = {
  goBackButtonTitle: '',
  setGoBackButtonTitle: () => undefined,
  title: 'Loading...',
  setTitle: () => undefined,
}
export const HeaderContext = createContext<ThemeContextType>(DefaultState)
