import React, { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

const Dashboard = lazy(() => import('../pages/dashboard'))
const SignUpApp = lazy(() => import('../app/signup-app'))

const PageContainer: React.FC = () => (
  <div className="page-container">
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/signup" element={<SignUpApp />} />
        {/* Add other routes for job analytics, etc. */}
        {/* <Route path="/job-analytics" element={<JobAnalytics />} /> */}
      </Routes>
    </Suspense>
  </div>
)

export default PageContainer
