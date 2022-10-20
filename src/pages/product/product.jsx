import React from 'react'
import { Outlet } from 'react-router-dom'
import './product.less'


export default function product() {
  return (
    <div>
        <Outlet/>
    </div>
    
  )
}
