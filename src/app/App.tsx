import '../assets/css/global.css'
import React, { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { HeaderContext } from '../context/context'
import { Layout } from '../layout/Layout'
import { Pages } from '../pages/Pages'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@mui/material'
import { store } from '../state/store'
import { theme } from '../assets/mui-theme'

function App() {
  const [title, setTitle] = useState('')
  const [goBackButtonTitle, setGoBackButtonTitle] = useState('')
  return (
    <div style={{ textAlign: 'center' }}>
      <BrowserRouter>
        <HeaderContext.Provider
          value={{ title, setTitle, goBackButtonTitle, setGoBackButtonTitle }}
        >
          <ThemeProvider theme={theme}>
            <Provider store={store}>
              <Layout>
                <Pages />
              </Layout>
            </Provider>
          </ThemeProvider>
        </HeaderContext.Provider>
      </BrowserRouter>
    </div>
  )
}

export default App
