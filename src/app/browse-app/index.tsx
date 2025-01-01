import React from 'react'
import Header from '../../base-components/Header'
import PageContainer from '../../page-container'
import { AppSidebar } from '../../base-components/Sidebar'
import { SidebarProvider, SidebarTrigger } from '../../components/ui/sidebar'
import { Toaster } from '../../components/ui/toaster'
import { useTypedSelector } from '../../redux/rootReducer'

const BrowseApp: React.FC = () => {
  const userType = useTypedSelector(state => state.App.sessionInfo.userType)
  return (
    <>
      <Header />
      <div className="h-[90%] w-full flex font-[Poppins] overflow-x-hidden">
        {userType === 'employer'
          ?
          <SidebarProvider>
            <AppSidebar />
            <main className="h-full w-full">
              <Toaster />
              <SidebarTrigger />
              <PageContainer />
            </main>
          </SidebarProvider>
          :
          <main className="h-full w-full">
            <Toaster />
            <PageContainer />
          </main>
        }
      </div>
    </>
  )
}

export default BrowseApp
