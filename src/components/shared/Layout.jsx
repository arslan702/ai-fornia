import React from 'react'

const Layout = ({ children }) => {
  return (
    <div className='flex flex-col justify-center items-center text-center pt-5 pb-10'>
        <div>
        {children}
        </div>
    </div>
  )
}

export default Layout