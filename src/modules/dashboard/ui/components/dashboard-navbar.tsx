'use client'

import { Button } from '@/components/ui/button'
import { useSidebar } from '@/components/ui/sidebar'
import { PanelBottomCloseIcon, PanelLeftIcon, SearchIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import DashboardCommand from './dashboard-command'

const DashboardNavbar = () => {

  const {state, toggleSidebar, isMobile} = useSidebar()

  const [commandOPen, setCommandOpen] = useState(false)

  useEffect(() => {
    const down = (e:KeyboardEvent) => {
      if(e.key === "k" && (e.metaKey || e.ctrlKey)){
        e.preventDefault();
        setCommandOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down)
  }, [])
  return (
    <>
    <DashboardCommand open={commandOPen} setOpen={setCommandOpen}/>
    <nav className='flex px-4 gap-x-2 items-center py-3 border-b bg-background'>
      <Button className='size-9' variant="outline" onClick={toggleSidebar}>
       {(state === "collapsed" || isMobile) ?  <PanelLeftIcon className='size-4'/>: <PanelBottomCloseIcon/>}
      </Button>
      <Button
      className='h-9 w-[240px] justify-start font-normal text-muted-foreground 
      hover:text-muted-foreground'
      variant="outline"
      size="sm"
      onClick={() => setCommandOpen((open) => !open)}
      >
        <SearchIcon/>
        Search
        <kbd className='ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1
        rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-mu'>
          <span className='text-xs'>&#8984;</span>
        </kbd>
      </Button>
    </nav>
    </>
  )
}

export default DashboardNavbar
