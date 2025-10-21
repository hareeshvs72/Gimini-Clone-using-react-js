import React from 'react'

function Header() {
  return (
    <div className='flex items-center justify-between'>
        <h1 className='font-semibold text-xl text-gray-400 tracking-widest'>Gemini</h1>
        <img src="/user_icon.png" alt="user image " width={'40px'} height={'40px'} style={{borderRadius:'50%'}} />
    </div>
  )
}

export default Header