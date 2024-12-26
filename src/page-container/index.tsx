import React, { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

const Dashboard = lazy(() => import('../pages/dashboard'))

const PageContainer: React.FC = () => (
  <div className="page-container">
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Redirect from root to dashboard */}
        <Route path="/" element={<Navigate replace to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Add other routes for job analytics, etc. */}
        {/* <Route path="/job-analytics" element={<JobAnalytics />} /> */}
      </Routes>
    </Suspense>
  </div>
)

export default PageContainer
