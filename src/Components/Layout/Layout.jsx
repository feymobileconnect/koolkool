import React from 'react'
import LogoCampaign from './LogoCampaign'

function Layout({children}) {
  return (
    <div className=" bg-[#9cff24]  w-full mt-4">
        <LogoCampaign/>
        {children}
    </div>
  )
}

export default Layout
