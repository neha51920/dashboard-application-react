import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const BlankPage = React.lazy(() => import('./views/pages/BlankPage/BlankPage'))
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/sales', name: 'Dashboard', element: BlankPage },
  { path: '/products', name: 'Dashboard', element: BlankPage },
  { path: '/stores', name: 'Dashboard', element: BlankPage },
  { path: '/notification', name: 'Dashboard', element: BlankPage },
  { path: '/settings', name: 'Dashboard', element: BlankPage },

]

export default routes
