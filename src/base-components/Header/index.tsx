import { Settings, User, Menu } from 'lucide-react'
import React, { useState } from 'react'

const Header = () => {
  const [activeTab, setActiveTab] = useState('Job Analytics')
  const [isNavOpen, setIsNavOpen] = useState(false) // Toggle for mobile nav

  const navItems = [
    { name: 'Job Post',
      link: '/job-post' },
    { name: 'Pacific',
      link: '/pacific' },
    { name: 'Help & Support',
      link: '/helpAndSupport' },
  ]

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
          isNavOpen ? 'block bg-[#1877F2] p-4 absolute top-full left-0 w-full z-10' : 'hidden'
        } sm:flex items-center gap-5 flex-wrap w-full sm:w-auto sm:mt-0`}
      >
        {navItems.map((item) => {
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
            <span className="text-white">Location</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="cursor-pointer border border-white rounded-full h-8 w-8 flex justify-center items-center">
              <User />
            </div>
            <div className="cursor-pointer border border-white rounded-full h-8 w-8 flex justify-center items-center">
              <Settings />
            </div>
          </div>
        </div>
      </nav>

      {/* Right Icons for Larger Screens */}
      <div className="hidden sm:flex items-center gap-4 min-w-0">
        <span className="text-white">Location</span>
        <div className="cursor-pointer border border-white rounded-full h-8 w-8 flex justify-center items-center">
          <User />
        </div>
        <div className="cursor-pointer border border-white rounded-full h-8 w-8 flex justify-center items-center">
          <Settings />
        </div>
      </div>
    </header>
  )
}

export default Header
