import React, { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

const Dashboard = lazy(() => import('../pages/dashboard'))
const PageContainer = () => (
  <div className="page-container">
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Navigate replace to="dashboard" />} />

        {/* Dashboard route */}
        <Route path="dashboard" element={<Dashboard />} />


      </Routes>
    </Suspense>
  </div>
)

export default PageContainer
