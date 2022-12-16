import '../assets/css/global.css'
import React, { useState } from 'react'
import { HashRouter } from 'react-router-dom'
import { HeaderTitleContext } from '../context/context'
import { Layout } from '../layout/Layout'
import { Pages } from '../pages/Pages'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@mui/material'
import { store } from '../state/store'
import { theme } from '../assets/mui-theme'

function App() {
  const [title, setTitle] = useState('')
  return (
    <div style={{ textAlign: 'center' }}>
      <HashRouter>
        <HeaderTitleContext.Provider value={{ title, setTitle }}>
          <ThemeProvider theme={theme}>
            <Provider store={store}>
              <Layout>
                <Pages />
              </Layout>
            </Provider>
          </ThemeProvider>
        </HeaderTitleContext.Provider>
      </HashRouter>
    </div>
  )
}

export default App
