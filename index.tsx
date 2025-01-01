import App from './src/app'
import React from 'react'
import { createRoot } from 'react-dom/client'
import './src/index.css'
import { Provider } from 'react-redux'
import store from './src/redux/store'
import { GoogleOAuthProvider } from '@react-oauth/google'
const rootElement = document.getElementById('root')

if (rootElement) {
  const root = createRoot(rootElement)
  root.render(
    <GoogleOAuthProvider clientId="238335367728-srd780p5cmdjfotkgc3q879dcaqlofko.apps.googleusercontent.com">
      <Provider store={store}>
        <App />
      </Provider>
    </GoogleOAuthProvider >
    ,
  )
} else {
  console.error('Root element not found')
}
