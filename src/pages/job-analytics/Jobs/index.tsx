import React, { useState } from 'react'
import { Table } from '../../../components/ui/table'
import { Button } from '../../../components/ui/button'
import { Card, CardHeader, CardContent } from '../../../components/ui/card'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
} from '../../../components/ui/pagination'
import { useNavigate } from 'react-router-dom'

import { useToast } from '../../../../hooks/use-toast'

// Generate Dummy Applicants Data
const generateDummyApplicants = () => {
  const names = ['John Doe', 'Jane Smith', 'Alice Brown', 'Bob Johnson', 'Charlie Davis']
  const skills = ['Node Js', 'Spring boot', 'Java', 'Javascript', 'Ruby']
  const locations = ['New York, NY', 'San Francisco, CA', 'Chicago, IL', 'Austin, TX', 'Miami, FL']
  const experiences = ['2 years', '5 years', '3 years', '7 years', '10 years']
  const ctcValues = ['$60,000', '$80,000', '$100,000', '$120,000', '$150,000']
  const cvStatus = ['Received', 'Under Review', 'Interview Scheduled', 'Rejected', 'Hired']

  const applicants = []
  for (let i = 1; i <= 10; i++) {
    const randomName = names[Math.floor(Math.random() * names.length)]
    const randomLocation = locations[Math.floor(Math.random() * locations.length)]
    const randomExperience = experiences[Math.floor(Math.random() * experiences.length)]
    const randomCTC = ctcValues[Math.floor(Math.random() * ctcValues.length)]
    const randomskills = skills[Math.floor(Math.random() * ctcValues.length)]
    const randomCvStatus = cvStatus[Math.floor(Math.random() * cvStatus.length)]

    applicants.push({
      id: i,
      name: randomName,
      location: randomLocation,
      experience: randomExperience,
      ctc: randomCTC,
      cvStatus: randomCvStatus,
      skills: randomskills,
    })
  }
  return applicants
}

// Generate Dummy Jobs Data
const generateDummyJobs = () => {
  const jobTitles = [
    'Software Engineer',
    'Product Manager',
    'Data Scientist',
    'Graphic Designer',
    'Marketing Specialist',
    'Sales Executive',
    'HR Coordinator',
    'Customer Support Representative',
    'Financial Analyst',
    'Operations Manager',
  ]

  const locations = [
    'New York, NY',
    'San Francisco, CA',
    'Chicago, IL',
    'Seattle, WA',
    'Austin, TX',
    'Boston, MA',
    'Atlanta, GA',
    'Los Angeles, CA',
    'Denver, CO',
    'Miami, FL',
  ]

  const jobs = []
  for (let i = 1; i <= 50000; i++) {
    const randomTitle = jobTitles[Math.floor(Math.random() * jobTitles.length)]
    const randomLocation = locations[Math.floor(Math.random() * locations.length)]
    const applicants = generateDummyApplicants() // Generate 10 applicants for each job

    jobs.push({
      id: i,
      title: `${randomTitle} #${i}`,
      location: randomLocation,
      date: new Date(
        Date.now() - Math.floor(Math.random() * 10000000000),
      ).toISOString().split('T')[0],
      status: i % 2 === 0 ? 'Open' : 'Closed',
      applicants: applicants, // Add applicants to each job
    })
  }
  return jobs
}

const jobs = generateDummyJobs()

function Jobs() {
  const navigate = useNavigate()
  const { toast } = useToast()

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1)
  const [inputPage, setInputPage] = useState('')
  const itemsPerPage = 10

  // Calculate Pagination
  const totalPages = Math.ceil(jobs.length / itemsPerPage)
  const displayedJobs = jobs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  )

  // Create Pagination Links
  const paginationLinks = Array.from({ length: totalPages }, (_, i) => i + 1)

  // Handle page number input
  const handlePageInput = (e: { target: { value: React.SetStateAction<string> } }) => {
    setInputPage(e.target.value)
  }

  const handlePageSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    const pageNumber = parseInt(inputPage, 10)

    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber)
      setInputPage('') // Clear the input field
      toast({ title: 'Page changed',
        description: `You are on page ${pageNumber}` })
    } else {
      toast({ title: 'Error',
        description: 'Invalid page number',
        variant: 'destructive' })
    }
  }

  // Handle pagination button clicks
  const handleNextClick = () => {
    if (currentPage === totalPages) {
      toast({ title: 'End of pages',
        description: 'You are already on the last page',
        variant: 'destructive' })
    } else {
      setCurrentPage((prev) => prev + 1)
      toast({ title: 'Next page',
        description: `You are on page ${currentPage + 1}` })
    }
  }

  const handlePrevClick = () => {
    if (currentPage === 1) {
      toast({ title: 'Start of pages',
        description: 'You are already on the first page',
        variant: 'destructive' })
    } else {
      setCurrentPage((prev) => prev - 1)
      toast({ title: 'Previous page',
        description: `You are on page ${currentPage - 1}` })
    }
  }

  // Handle Click Here button
  const handleRowClick = (job: { id: number; title: string; location: string; date: string; status: string; applicants: { id: number; name: string; location: string; experience: string; ctc: string; cvStatus: string }[] }) => {
    navigate('/job-analytics/job-details', { state: { job } }) // Pass the job data and applicants to the JobDetails component
  }

  return (
    <div className="p-6">
      <Card className="shadow-lg">
        {/* Card Header */}
        <CardHeader className="bg-gray-100 p-4 border-b">
          <h1 className="text-xl font-bold text-gray-800">Jobs</h1>
        </CardHeader>

        {/* Card Content */}
        <CardContent className="p-4">
          <Table>
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3 text-left text-sm font-medium text-gray-600">Job Title</th>
                <th className="p-3 text-left text-sm font-medium text-gray-600">Location</th>
                <th className="p-3 text-left text-sm font-medium text-gray-600">Date Posted</th>
                <th className="p-3 text-left text-sm font-medium text-gray-600">Status</th>
                <th className="p-3 text-left text-sm font-medium text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {displayedJobs.map((job) => (
                <tr key={job.id} className="border-b">
                  <td className="p-3 text-sm text-gray-800">{job.title}</td>
                  <td className="p-3 text-sm text-gray-800">{job.location}</td>
                  <td className="p-3 text-sm text-gray-800">{job.date}</td>
                  <td className="p-3 text-sm text-gray-800">{job.status}</td>
                  <td className="p-3">
                    <Button
                      onClick={() => handleRowClick(job)} // Pass the job data and applicants to navigate
                      size="sm"
                      className="bg-blue-500 text-white hover:bg-blue-600"
                    >
                      Click Here
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center mt-4">
            <Pagination className="flex gap-2 items-center">
              <PaginationContent className="flex gap-2">
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    className="text-gray-600 hover:text-blue-600"
                    onClick={handlePrevClick}
                  >
                    Previous
                  </PaginationPrevious>
                </PaginationItem>

                {paginationLinks.slice(
                  Math.max(0, currentPage - 3),
                  Math.min(totalPages, currentPage + 2),
                ).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      className={`px-2 py-1 border rounded ${
                        page === currentPage
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                      }`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    className="text-gray-600 hover:text-blue-600"
                    onClick={handleNextClick}
                  >
                    Next
                  </PaginationNext>
                </PaginationItem>
              </PaginationContent>

              {/* Page Number Input */}
              <div className="flex items-center gap-2 ml-4">
                <label htmlFor="page-input" className="text-sm text-gray-600">
                  Go to page:
                </label>
                <form onSubmit={handlePageSubmit} className="flex items-center">
                  <input
                    id="page-input"
                    type="number"
                    value={inputPage}
                    onChange={handlePageInput}
                    className="px-2 py-1 border rounded"
                    placeholder={`1-${totalPages}`}
                  />
                  <button
                    type="submit"
                    className="ml-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Go
                  </button>
                </form>
              </div>
            </Pagination>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Jobs
