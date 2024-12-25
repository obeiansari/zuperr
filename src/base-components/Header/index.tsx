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
    <header className="h-[10%] w-full bg-[#1877F2] flex flex-wrap items-center justify-between px-5 box-border relative font-[Poppins]">
      {/* Logo */}
      <div className="flex items-center cursor-pointer">
        {/* <img src={Logo} alt="Zuperr Logo" className="h-7 w-auto" /> */}
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
          isNavOpen ? 'block' : 'hidden'
        } sm:flex items-center gap-5 flex-wrap min-w-0 w-full sm:w-auto mt-4 sm:mt-0`}
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
      </nav>

      {/* Right Icons */}
      <div className="flex items-center gap-4 min-w-0">
        <span className="hidden sm:block text-white">Location</span>

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
