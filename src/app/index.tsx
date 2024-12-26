import React, { Suspense, lazy } from 'react'
import { Routes, Route, BrowserRouter as Router, Navigate } from 'react-router-dom'
import { useTypedSelector } from '../redux/rootReducer'

const SignIn = lazy(() => import('./login-app'))
const SignUp = lazy(() => import('./signup-app'))
const BrowseApp = lazy(() => import('./browse-app'))
const SignUpOtp = lazy(() => import('./signup-app/SignUpOtp'))
const SignInOtp = lazy(() => import('./login-app/SignInOtp'))

const App: React.FC = () => {
  const sessionInfo = useTypedSelector(state => state.App.sessionInfo)

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router basename="/">
        <Routes>
          {sessionInfo?.sessionLoggedIn ? (
            <>
              {/* Private routes, for logged-in users */}
              <Route path="*" element={<BrowseApp />} />
            </>
          ) : (
            <>
              {/* Public routes for unauthenticated users */}
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin-otp" element={<SignInOtp />} />
              <Route path="/signup-otp" element={<SignUpOtp />} />
              {/* Redirect all other paths to /signin */}
              <Route path="*" element={<Navigate to="/signin" replace />} />
            </>
          )}
        </Routes>
      </Router>
    </Suspense>
  )
}

export default App
