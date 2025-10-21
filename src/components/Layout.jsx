import React from 'react'
import Sidebar from './Sidebar'
import Main from './Main'

function Layout() {
  return (
    <div className='flex'>
      <div className='hidden  md:block'>  <Sidebar/></div>
        <Main/>
    </div>
  )
}

export default Layout