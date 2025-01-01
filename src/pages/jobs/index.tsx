import React, { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/card'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../../components/ui/accordion'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { Input } from '../../components/ui/input'
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '../../components/ui/select'

const Jobs = () => {
  // State management
  const [categories, setCategories] = useState([
    { name: 'HR',
      jobs: 120 },
    { name: 'Developer',
      jobs: 120 },
    { name: 'Designer',
      jobs: 120 },
    { name: 'SEO',
      jobs: 120 },
    { name: 'Marketing',
      jobs: 120 },
    { name: 'Data Entry',
      jobs: 120 },
  ])

  const [filters, setFilters] = useState([
    { title: 'Working Schedule',
      options: ['Full-time', 'Part-time'] },
    { title: 'Employment Type',
      options: ['Permanent', 'Contract'] },
    { title: 'Company Type',
      options: ['Startup', 'MNC'] },
    { title: 'Industry',
      options: ['IT', 'Finance', 'Healthcare'] },
    { title: 'Education',
      options: ['Bachelor\'s', 'Master\'s'] },
    { title: 'Distance',
      options: ['< 5km', '< 10km'] },
    { title: 'Cities',
      options: ['Mumbai', 'Pune', 'Delhi'] },
  ])

  const [jobs, setJobs] = useState([
    {
      title: 'Senior UI/UX Designer',
      company: 'Amazon',
      location: 'Dombivli (East)',
      experience: '3-5 years',
      salary: '₹ 6-8.5 LPA',
      skills: ['Figma', 'Adobe XD', 'Prototyping'],
      postedDate: '20 May, 2023',
      bgColor: 'bg-orange-100',
    },
    {
      title: 'Senior UI/UX Designer',
      company: 'Amazon',
      location: 'Dombivli (East)',
      experience: '3-5 years',
      salary: '₹ 6-8.5 LPA',
      skills: ['Figma', 'Adobe XD', 'Prototyping'],
      postedDate: '20 May, 2023',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Senior UI/UX Designer',
      company: 'Amazon',
      location: 'Dombivli (East)',
      experience: '3-5 years',
      salary: '₹ 6-8.5 LPA',
      skills: ['Figma', 'Adobe XD', 'Prototyping'],
      postedDate: '20 May, 2023',
      bgColor: 'bg-purple-100',
    },
  ])

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        // Replace with your actual API endpoint
        const categoriesResponse = await fetch('/api/categories')
        const categoriesData = await categoriesResponse.json()

        const filtersResponse = await fetch('/api/filters')
        const filtersData = await filtersResponse.json()

        const jobsResponse = await fetch('/api/jobs')
        const jobsData = await jobsResponse.json()

        setCategories(categoriesData)
        setFilters(filtersData)
        setJobs(jobsData)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      {/* Header Section */}
      <div className="flex justify-between items-center mb-10 bg-primary text-white p-10 w-full border-t-[1px] border-[#D1CFCF]">
        <Input placeholder="Jobs, Company, Skill..." className="w-3/4 text-white" />
        <Select>
          <SelectTrigger className="w-1/4 ml-4">
            <SelectValue placeholder="Enter Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="mumbai">Mumbai</SelectItem>
            <SelectItem value="pune">Pune</SelectItem>
            <SelectItem value="delhi">Delhi</SelectItem>
          </SelectContent>
        </Select>
        <Button className="ml-4">Search</Button>
      </div>
      <div className="p-6">

        {/* Main Content */}
        <div className="grid grid-cols-4 gap-6">
          {/* Filters Section */}
          <aside>
            <Card>
              <CardHeader>
                <CardTitle>All Filters</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <p>Loading filters...</p>
                ) : (
                  <Accordion type="multiple">
                    {filters.map((filter, index) => (
                      <AccordionItem key={index} value={`filter-${index}`}>
                        <AccordionTrigger>{filter.title}</AccordionTrigger>
                        <AccordionContent>
                          <ul>
                            {filter.options.map((option, idx) => (
                              <li key={idx} className="py-1">
                                {option}
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                )}
              </CardContent>
            </Card>
          </aside>

          {/* Main Section */}
          <main className="col-span-3">
            {/* Categories Section */}
            <section>
              <Card>
                <CardHeader>
                  <CardTitle>Categories</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-3 gap-4">
                  {loading ? (
                    <p>Loading categories...</p>
                  ) : (
                    categories.map((category, index) => (
                      <Card
                        key={index}
                        className="text-center py-4 bg-blue-100 hover:bg-blue-200 cursor-pointer"
                      >
                        <CardTitle>{category.name}</CardTitle>
                        <CardDescription>{category.jobs} jobs</CardDescription>
                      </Card>
                    ))
                  )}
                </CardContent>
              </Card>
            </section>

            {/* Recommended Jobs Section */}
            <section className="mt-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Recommended Jobs</h2>
                <Badge variant="secondary">{jobs.length}</Badge>
              </div>
              <div className="grid grid-cols-3 gap-6 mt-4">
                {loading ? (
                  <p>Loading jobs...</p>
                ) : (
                  jobs.map((job, index) => (
                    <Card key={index} className={job.bgColor}>
                      <CardHeader>
                        <CardTitle>{job.title}</CardTitle>
                        <CardDescription>{job.company}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p>{job.location}</p>
                        <p>Experience: {job.experience}</p>
                        <p>{job.salary}</p>
                        <div className="flex gap-2 mt-2">
                          {job.skills.map((skill, idx) => (
                            <Badge key={idx} variant="outline">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        <Button variant="default" className="mt-4">
                          Apply
                        </Button>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </section>
          </main>
        </div>

        {/* Footer Section */}
        <footer className="mt-6 bg-gray-100 p-6 rounded">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <h3 className="text-lg font-bold">Zuperr</h3>
              <p>Build Your Dream Career with the Right Job.</p>
            </div>
            <div>
              <ul>
                <li>About Us</li>
                <li>Contact Us</li>
                <li>Trust & Safety</li>
                <li>Privacy Policy</li>
                <li>Terms & Conditions</li>
              </ul>
            </div>
            <div className="text-right">
              <p>Give us a Call: <strong>84220 65312</strong></p>
              <Button variant="link" className="mt-2">Download our App</Button>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

export default Jobs
