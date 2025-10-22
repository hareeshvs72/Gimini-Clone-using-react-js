import React, { useState } from 'react'
import Sidebar from './Sidebar'
import Main from './Main'

function Layout() {
     const [prevPrompt ,setPrevprompt] = useState([])
      
  return (
    <div className='flex'>
      <div className='hidden  md:block'>
          <Sidebar prevPrompt={prevPrompt} setPrevprompt={setPrevprompt} />
          </div>
        <Main prevPrompt={prevPrompt} setPrevprompt={setPrevprompt}/>
    </div>
  )
}

export default Layout