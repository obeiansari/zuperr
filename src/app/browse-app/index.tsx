import React from 'react'
import Header from '../../base-components/Header'
// import Sidebar from '../../base-components/Sidebar'
import Header from '../../base-components/Header'
// import Sidebar from '../../base-components/Sidebar'
import PageContainer from '../../page-container'
import { AppSidebar } from '../../base-components/Sidebar'
import { SidebarProvider, SidebarTrigger } from '../../../components/ui/sidebar'

const BrowseApp: React.FC = () => (
  <>
    <Header />
    <div className="h-[90%] w-full flex font-[Poppins] overflow-hidden">
      <SidebarProvider>
        <AppSidebar />
        <main className="h-full overflow-hidden">
          <SidebarTrigger />
          <PageContainer/>
        </main>
      </SidebarProvider>
    <Header />
    <div className="h-[90%] w-full flex font-[Poppins] overflow-hidden">
      <SidebarProvider>
        <AppSidebar />
        <main className="h-full overflow-hidden">
          <SidebarTrigger />
          <PageContainer/>
        </main>
      </SidebarProvider>
    </div>
  </>
)

export default BrowseApp
