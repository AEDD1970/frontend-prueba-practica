import React from 'react'
import { Routes as Routing, Route } from "react-router-dom"
import DashboardProducts from './Products/Dashboard'
import CreateProduct from './Products/Create'
import CreateStores from './Stores/Create'
import DashboardStores from './Stores/Dashboard'
import DetailsStore from './Stores/Details'
import DetailsProduct from './Products/Details'
import CreateStock from './Stocks/Create'

function Routes() {
  return (
    <Routing>
      <Route path="Stores">
        <Route index element={<DashboardStores />} />
        <Route path='create-store' element={<CreateStores />} />
        <Route path='details/:id' element={<DetailsStore />} />
      </Route>
      <Route path="Products">
        <Route index element={<DashboardProducts />} />
        <Route path='create-products' element={<CreateProduct />} />
        <Route path='details/:id' element={<DetailsProduct />} />
      </Route>
      <Route path="Stocks">
        <Route index element={<CreateStock />} />
      </Route>
    </Routing>
  )
}

export default Routes