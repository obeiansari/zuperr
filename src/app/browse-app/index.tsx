import React from 'react'
import Header from '../../base-components/Header'
// import Sidebar from '../../base-components/Sidebar'
import PageContainer from '../../page-container'
import { AppSidebar } from '../../base-components/Sidebar'
<<<<<<< HEAD
import { SidebarProvider, SidebarTrigger } from '../../../components/ui/sidebar'
=======
import { SidebarProvider, SidebarTrigger } from '../../components/ui/sidebar'
>>>>>>> ed491cacb1c95799c33e367e8dfc5ba6bf6fed49

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
    </div>
  </>
)

export default BrowseApp
