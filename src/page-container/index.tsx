import React, { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useTypedSelector } from '../../src/redux/rootReducer'

const Dashboard = lazy(() => import('../pages/dashboard'))
const Jobs = lazy(() => import('../pages/job-analytics/Jobs/index'))
const EmployeeJobs = lazy(() => import('../pages/jobs/index'))
const JobDetails = lazy(() => import('../pages/job-analytics/JobDetails/index'))

const PageContainer: React.FC = () => {
  const sessionInfo = useTypedSelector(state => state.App.sessionInfo)
  return (

    < div className="page-container" >
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Employee Routes */}
          {sessionInfo.userType === 'employee' && (
            <>
              <Route path="/" element={<Navigate replace to="/jobs" />} />
              <Route path="/jobs" element={<EmployeeJobs />} />
              <Route path="/companies" element={<div>Companies Component</div>} />
              <Route path="/analytics" element={<div>Analytics Component</div>} />
              <Route path="/create-resume" element={<div>Create Resume Component</div>} />
            </>
          )}
          {/* Employer Routes */}
          {sessionInfo.userType === 'employer' && (
            <>
              <Route path="/" element={<Navigate replace to="/dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/job-analytics" element={<Navigate replace to="/job-analytics/Jobs" />} />
              <Route path="/job-analytics/jobs" element={<Jobs />} />
              <Route path="/job-analytics/job-details" element={<JobDetails />} />
              <Route path="/job-post" element={<div>Job Post Component</div>} />
              <Route path="/pacific" element={<div>Pacific Component</div>} />
              <Route path="/helpAndSupport" element={<div>Help & Support Component</div>} />
            </>
          )}
        </Routes>
      </Suspense>
    </div >
  )
}
export default PageContainer
