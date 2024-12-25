import { Home, BarChart, Users, TrendingUp } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '../../../components/ui/sidebar'
import React from 'react'

const items = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: Home,
  },
  {
    title: 'Job Analytics',
    url: '/job-analytics',
    icon: BarChart,
  },
  {
    title: 'Candidates',
    url: '/candidates',
    icon: Users,
  },
  {
    title: 'Sponsored',
    url: '/sponsored',
    icon: TrendingUp,
  },
]

export function AppSidebar() {
  return (
    <Sidebar className="mt-[60px]" collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center py-2 px-4 rounded-md hover:text-white hover:!bg-primary transition-all">
                      <item.icon size={20} className="mr-3" /> {/* Adjust icon size */}
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
