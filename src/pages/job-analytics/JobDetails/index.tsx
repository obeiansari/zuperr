import React, { useState, useEffect, useCallback } from 'react'
import { Table } from '../../../components/ui/table'
import { Button } from '../../../components/ui/button'
import { Slider } from '../../../components/ui/slider'
import { Card, CardContent } from '../../../components/ui/card'
import { useLocation, useNavigate } from 'react-router-dom'
import { useToast } from '../../../../hooks/use-toast'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
} from '../../../components/ui/pagination'
import { MultiSelect } from '../../../components/ui/multi-select'

interface Applicant {
  name: string
  skills: string[]
  location: string
  experience: number;
  ctc: number;
}

const skillsList = [
  { value: 'JavaScript',
    label: 'JavaScript' },
  { value: 'React',
    label: 'React' },
  { value: 'Node.js',
    label: 'Node.js' },
  { value: 'Python',
    label: 'Python' },
  { value: 'HTML',
    label: 'HTML' },
]

const experienceList = [
  { value: '1',
    label: '1-3 years' },
  { value: '2',
    label: '3-5 years' },
  { value: '3',
    label: '5+ years' },
]

const ctcList = [
  { value: '1',
    label: 'Less than 5L' },
  { value: '2',
    label: '5L-10L' },
  { value: '3',
    label: 'Above 10L' },
]

function JobDetails() {
  const navigate = useNavigate()
  const location = useLocation()
  const applicants: Applicant[] = location.state?.job?.applicants || []

  const { toast } = useToast()

  const [inputPage, setInputPage] = useState('')
  const [filters, setFilters] = useState({
    skills: [] as string[],
    location: 50,
    experience: [] as string[],
    ctc: [] as string[],
  })
  const [filteredApplicants, setFilteredApplicants] = useState(applicants)
  const [totalPages, setTotalPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Function to fetch applicants based on current filters and pagination
  const fetchApplicants = useCallback(async (page: number) => {
    try {
      // Commented out the actual API call
      // const response = await fetch('/api/applicants', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     filters,
      //     page,
      //     itemsPerPage,
      //   }),
      // })
      // const data = await response.json()

      // Using hardcoded data instead of the API response
      const data = {
        applicants: [
          {
            name: 'John Doe',
            skills: ['JavaScript', 'React', 'Node.js'],
            location: '100',
            experience: 5,
            ctc: 1000000,
          },
          {
            name: 'Jane Smith',
            skills: ['Python', 'Django', 'Machine Learning'],
            location: '200',
            experience: 3,
            ctc: 800000,
          },
          {
            name: 'Mike Johnson',
            skills: ['Java', 'Spring Boot', 'AWS'],
            location: '150',
            experience: 7,
            ctc: 1200000,
          },
        ],
        totalCount: 3,
      }

      if (data) {
        setFilteredApplicants(data.applicants) // Set applicants data
        setTotalPages(Math.ceil(data.totalCount / itemsPerPage)) // Calculate total pages
      } else {
        toast({
          title: 'Error',
          description: 'An error occurred while fetching data.',
          variant: 'destructive',
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: `An error occurred while fetching data. ${error}`,
        variant: 'destructive',
      })
    }
  }, [filters, toast])

  // Effect hook to fetch data whenever the page changes
  useEffect(() => {
    fetchApplicants(currentPage)
  }, [currentPage, fetchApplicants])

  // Pagination logic to calculate displayed applicants
  const displayedApplicants = filteredApplicants.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  )

  // Handling search
  const handleSearch = async () => {
    debugger
    console.log(filters,'filters')
    setCurrentPage(1) // Reset to the first page when new filters are applied
    fetchApplicants(1) // Fetch the first page with the new filters
    toast({
      title: 'Filters applied',
      description: 'Applying your filters and fetching applicants.',
    })
  }

  // Reset filters
  const handleResetFilters = () => {
    setFilters({
      skills: [],
      location: 50,
      experience: [],
      ctc: [],
    })
    setCurrentPage(1) // Reset to the first page
    fetchApplicants(1) // Fetch the first page after reset
    toast({
      title: 'Filters reset',
      description: 'All applicants are shown.',
    })
  }

  // Handle page change via input
  const handlePageInput = (e: { target: { value: React.SetStateAction<string> } }) => {
    setInputPage(e.target.value)
  }

  const handlePageSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    const pageNumber = parseInt(inputPage, 10)

    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber)
      setInputPage('') // Clear the input field
      toast({
        title: 'Page changed',
        description: `You are on page ${pageNumber}`,
      })
    } else {
      toast({
        title: 'Error',
        description: 'Invalid page number',
        variant: 'destructive',
      })
    }
  }

  const handleNextClick = () => {
    if (currentPage === totalPages) {
      toast({
        title: 'End of pages',
        description: 'You are already on the last page',
        variant: 'destructive',
      })
    } else {
      setCurrentPage((prev) => prev + 1)
    }
  }

  const handlePrevClick = () => {
    if (currentPage === 1) {
      toast({
        title: 'Start of pages',
        description: 'You are already on the first page',
        variant: 'destructive',
      })
    } else {
      setCurrentPage((prev) => prev - 1)
    }
  }

  // Create Pagination Links
  const paginationLinks = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="p-6">
      <Card className="shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 p-4">
          <h2 className="text-2xl font-bold text-gray-800">Applicants</h2>
          <Button
            onClick={() => navigate('/job-analytics/jobs')}
            size="sm"
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            Close
          </Button>
        </div>

        {/* Filters Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 p-4 items-center">
          <div>
            <MultiSelect
              options={skillsList}
              onValueChange={(value) => setFilters({ ...filters,
                skills: value })}
              value={filters.skills}
              placeholder="Select Skills"
            />
          </div>

          {/* Location Filter */}
          <div>
            <label htmlFor="location" className="text-sm">Max Location:</label>
            <Slider
              value={[filters.location]}
              min={1}
              max={100}
              step={1}
              onValueChange={(value) => setFilters({ ...filters,
                location: value[0] })}
            />
            <span>{filters.location}km</span>
          </div>

          {/* Experience Filter */}
          <div>
            <MultiSelect
              options={experienceList}
              onValueChange={(value) => setFilters({ ...filters,
                experience: value })}
              value={filters.experience}
              placeholder="Select Experience"
            />
          </div>

          {/* CTC Filter */}
          <div>
            <MultiSelect
              options={ctcList}
              onValueChange={(value) => setFilters({ ...filters,
                ctc: value })}
              value={filters.ctc}
              placeholder="Select CTC"
            />
          </div>
        </div>

        <div className="flex justify-between mb-4 p-4">
          <Button onClick={handleSearch} className="bg-green-500 text-white hover:bg-green-600">
            Apply Filters
          </Button>
          <Button onClick={handleResetFilters} className="bg-gray-500 text-white hover:bg-gray-600">
            Reset Filters
          </Button>
        </div>

        {/* Table of Applicants */}
        <CardContent className="p-4">
          <Table>
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Skills</th>
                <th className="p-3 text-left">Location</th>
                <th className="p-3 text-left">Experience</th>
                <th className="p-3 text-left">CTC</th>
              </tr>
            </thead>
            <tbody>
              {displayedApplicants.map((applicant, index) => (
                <tr key={index}>
                  <td className="p-3">{applicant.name}</td>
                  <td className="p-3">{Array.isArray(applicant.skills) ? applicant.skills.join(', ') : 'No skills'}</td>
                  <td className="p-3">{applicant.location} km</td>
                  <td className="p-3">{applicant.experience} years</td>
                  <td className="p-3">{applicant.ctc}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardContent>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center mt-4 p-4 text-white">
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
                    className={`px-2 py-1 rounded ${page === currentPage ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'}`}
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
            <form onSubmit={handlePageSubmit} className="flex items-center">
              <input
                type="number"
                value={inputPage}
                onChange={handlePageInput}
                min="1"
                max={totalPages}
                className="w-16 p-2 border rounded"
                placeholder={'Page'}
              />
              <Button type="submit" className="ml-2">Go</Button>
            </form>
          </Pagination>
        </div>
      </Card>
    </div>
  )
}

export default JobDetails
