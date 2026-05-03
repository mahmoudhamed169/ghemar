import React from 'react'
import CustomerHeaderPage from './_components/customer-page-header'

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <CustomerHeaderPage />
      {children}
    </div>
  )
}
