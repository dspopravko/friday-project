import {createContext} from "react";

type ThemeContextType = {
    title: string
    setTitle: (title: string) => void
}
const DefaultState = {
    title: 'Loading...',
    setTitle: (title: string) => {}
}
export const HeaderTitleContext = createContext<ThemeContextType>(DefaultState)
