import React, { useState } from 'react'
import { useTypedSelector } from '../../../src/redux/rootReducer'
import { Settings, User, Menu } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select'

type TNavItem = {
  name: string;
  link: string;
};

type TEmployeeNavItems = TNavItem[];
type TEmployerNavItems = TNavItem[];
interface IHeaderNavItems {
  employee: TEmployeeNavItems
  employer: TEmployerNavItems
}

type TLocations = {
  value: string;
  label: string;
};

const Header = () => {
  const userType = useTypedSelector(state => state.App.sessionInfo.userType)
  const [activeTab, setActiveTab] = useState(userType === 'employee' ? 'Jobs' : 'Pacific')
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [locations, setlocations] = useState<TLocations[]>([])


  const locationsData: TLocations[] = [
    {
      value: 'mumbai',
      label: 'Mumbai',
    },
    {
      value: 'Ghatkoper',
      label: 'ghatkoper',
    },
  ]
  console.log(userType, 'userType')
  const navItems: IHeaderNavItems = {
    employee: [
      {
        name: 'Jobs',
        link: '/jobs',
      },
      {
        name: 'Companies',
        link: '/companies',
      },
      {
        name: 'Analytics',
        link: '/analytics',
      },
      {
        name: 'Create Resume',
        link: '/create-resume',
      },
    ],
    employer: [
      {
        name: 'Job Post',
        link: '/job-post',
      },
      {
        name: 'Pacific',
        link: '/pacific',
      },
      {
        name: 'Help & Support',
        link: '/helpAndSupport',
      },
    ],

  }

  const handleNavClick = (tab: string, event: React.MouseEvent) => {
    event.preventDefault()
    setActiveTab(tab)
  }
  return (
    <header className="h-[10%] w-full bg-[#1877F2] flex items-center justify-between px-5 box-border relative font-[Poppins]">
      {/* Logo */}
      <div className="flex items-center cursor-pointer">
        <span className="text-white text-xl font-bold">Zuperr</span>
      </div>

      {/* Hamburger Menu for Small Screens */}
      <button
        className="text-white text-2xl sm:hidden focus:outline-none"
        onClick={() => setIsNavOpen(!isNavOpen)}
      >
        <Menu />
      </button>

      {/* Navigation */}
      <nav
        className={`${
          isNavOpen
            ? 'block bg-[#1877F2] p-4 absolute top-full left-0 w-full z-10'
            : 'hidden'
        } sm:flex items-center gap-5 flex-wrap w-full sm:w-auto sm:mt-0`}
      >
        {navItems[userType as keyof IHeaderNavItems].map((item: { name: string; link: string }) => {
          const isActive = activeTab === item.name

          if (item.name === 'Pacific') {
            return (
              <a
                key={item.name}
                href={item.link}
                className={`text-white text-lg font-medium relative cursor-pointer 
                ${
              isActive
                ? 'after:content-[""] after:absolute after:top-[138%] after:left-0 after:right-0 after:h-[3px] after:bg-white after:rounded-lg'
                : ''
              }`}
                onClick={(e) => handleNavClick(item.name, e)}
              >
                <div className="flex items-center gap-1">
                  <span className="text-white text-lg">{item.name}</span>
                  <div className="bg-gradient-to-r from-[#F9F295] to-[#B88A44] text-black text-sm font-bold px-2 py-1 rounded-full">
                  Premium
                  </div>
                </div>
              </a>
            )
          }

          return (
            <a
              key={item.name}
              href={item.link}
              className={`text-white text-lg font-medium relative cursor-pointer 
              ${
            isActive
              ? 'after:content-[""] after:absolute after:top-[138%] after:left-0 after:right-0 after:h-[3px] after:bg-white after:rounded-lg'
              : ''
            }`}
              onClick={(e) => handleNavClick(item.name, e)}
            >
              {item.name}
            </a>
          )
        })}

        {/* Right Icons in Mobile Navigation */}
        <div className="flex flex-col sm:hidden gap-4 mt-4">
          <div className="flex items-center gap-4">
            <Select
              onValueChange={(value) => {
                const selectedLocation = locationsData.find((location) => location.value === value)
                setlocations(selectedLocation ? [selectedLocation] : [])
              }}
            >
              <SelectTrigger
                className="w-full h-12 text-white border-b border-white text-lg"
                style={{
                  minHeight: '3rem',
                  minWidth: '100%',
                  fontSize: '1.125rem',
                }}
              >
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                {locationsData.map((location) => (
                  <SelectItem key={location.value} value={location.value}>
                    {location.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-4">
            <div className="cursor-pointer border border-white rounded-full h-10 w-10 flex justify-center items-center">
              <User />
            </div>
            <div className="cursor-pointer border border-white rounded-full h-10 w-10 flex justify-center items-center">
              <Settings />
            </div>
          </div>
        </div>
      </nav>

      {/* Right Icons for Larger Screens */}
      <div className="hidden sm:flex items-center gap-4">
        <div className="flex items-center gap-4 mr-5">
          <Select
            onValueChange={(value) => {
              const selectedLocation = locationsData.find((location) => location.value === value)
              setlocations(selectedLocation ? [selectedLocation] : [])
            }}
          >
            <SelectTrigger
              className="h-12 w-48 text-white border-b border-white border-t-0 border-l-0 border-r-0 rounded-none text-lg px-0"
              style={{
                minHeight: '3rem',
                minWidth: '15rem',
                fontSize: '1.125rem',
              }}
            >
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              {locationsData.map((location) => (
                <SelectItem key={location.value} value={location.value}>
                  {location.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-4">
          {/* User Icon */}
          <div className="cursor-pointer border border-white rounded-full h-10 w-10 flex justify-center items-center">
            <User className="text-white" />
          </div>

          {/* Settings Icon */}
          <div className="cursor-pointer border border-white rounded-full h-10 w-10 flex justify-center items-center">
            <Settings className="text-white" />
          </div>
        </div>
      </div>
    </header>

  )
}
export default Header
