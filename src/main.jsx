import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from './Components/login'
import './index.css'
import RegisterSuccess from './Components/registerSuccess.jsx'
import Activity from './Components/activity.jsx';
import Luckydraw from './Components/luckydraw';
import StatusBill from './Components/statusBill.jsx';
import TermsAndPrize from './Components/termsAndPrize.jsx'
import WinnerReward from './Components/winnerReward.jsx'
import ActivitySuccess from './Components/activitySuccess.jsx'
import ProtectedRoute from './auth/ProtectedRoute.jsx';
import { UserAuthContextProvider } from './Components/context/UserAuthContext.jsx';
import   Layout from './Components/Layout/Layout.jsx'
import PrivacyModal from './Components/Modal/privacyModal.jsx'
import FormAntd from './Components/FormAntd.jsx';
import Home from './Components/Home.jsx'


const router = createBrowserRouter([
  /* {
    path: "/",
    element: 
    <Layout>
      <Home />
    </Layout>
  }, */
  {
    path: "/",
    element: 
    <Layout>
      <Login />
    </Layout>
  },
  {
    path: "/RegisterSuccess",
    element: 
    <Layout>
      <RegisterSuccess />
    </Layout>
  },
  {
    path: "/activity",
    element: 
    <ProtectedRoute>
      <Layout>
        <Activity />
      </Layout>
    </ProtectedRoute>
  },
  {
    path: "/luckydraw",
    element: 
    <ProtectedRoute>
      <Layout>
        <Luckydraw />
      </Layout>
    </ProtectedRoute>
    
  },
  {
    path: "/statusbill",
    element: 
    <ProtectedRoute>
     <Layout>
      <StatusBill  />
      </Layout>
    </ProtectedRoute>
  },
  {
    path: "/term",
    element: 
    <ProtectedRoute>
    <Layout>
    <TermsAndPrize  />
    </Layout>
    </ProtectedRoute>
  },
  {
    path: "/winners",
    element: 
    <ProtectedRoute>
    <Layout>
    <WinnerReward  />
    </Layout>
    </ProtectedRoute>
  },
  {
    path: "/activitySuccess",
    element: 
    <Layout>
      <ActivitySuccess  />
    </Layout>
  },
  {
    path: "/privacy",
    element: <PrivacyModal />
  },
  {
    path: "/register",
    element: 
    <Layout>
    <FormAntd />
    </Layout>
  },
    
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserAuthContextProvider>
     <RouterProvider router={router} />
     </UserAuthContextProvider>
  </React.StrictMode>,
)