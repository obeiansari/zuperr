import App from './src/app'
import React from 'react'
import { createRoot } from 'react-dom/client'
import './src/index.css'
import { Provider } from 'react-redux'
import store from './src/redux/store'
const rootElement = document.getElementById('root')

if (rootElement) {
  const root = createRoot(rootElement)
  root.render(
    <Provider store={store}>
      <App />
    </Provider>,
  )
} else {
  console.error('Root element not found')
}
