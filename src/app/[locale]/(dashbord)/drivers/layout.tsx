import React from 'react'
import DriverHeaderPage from './_components/driver-header-page'


export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <DriverHeaderPage />
      {children}
    </div>
  )
}
