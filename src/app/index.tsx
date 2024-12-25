import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

const LoginApp = lazy(() => import('./login-app'))
const BrowseApp = lazy(() => import('./browse-app'))

const App: React.FC = () => {
  const isUserLoggedIn = !!sessionStorage.getItem('userLoggedIn')

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router basename="/">
        {isUserLoggedIn ? <BrowseApp /> : <LoginApp />}
      </Router>
    </Suspense>
  )
}

export default App
