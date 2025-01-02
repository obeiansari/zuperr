import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../components/ui/card'
import { CirclePlus, Ellipsis } from 'lucide-react'
import { Button } from '../../components/ui/button'
const JobAnalytics = () => (
  <>
    <div className="flex flex-row">
      <h1>Job Post</h1>
      <div>2</div>
    </div>
    <div className="row">
      <span>
        <input className="" type="text"/>
      </span>
    </div>
    <div className="grid grid-cols-4 gap-5">
      <div>
        <Card className="w-[300px] h-[270px]">
          <CardContent className="flex flex-col items-center justify-center h-full">
            <CirclePlus />
            <span className="">Create a Job Post</span>
          </CardContent>
        </Card>
      </div>
      <div>
        <Card className="w-[300px] h-[270px]">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <Ellipsis/>
              <Button variant="secondary" className="rounded-full">31-12-24</Button>
            </CardTitle>
          </CardHeader>
          <hr className="border-t border-gray-300" />
        </Card>
      </div>
    </div>

  </>
)

export default JobAnalytics