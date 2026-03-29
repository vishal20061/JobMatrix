import React from 'react'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import store from './redux/store'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Jobs from './pages/Jobs'
import Browse from './pages/Browse'
import Profile from './pages/Profile'
import JobDescription from './pages/JobDescription'
import Companies from './pages/admin/Companies'
import CompanyCreate from './pages/admin/CompanyCreate'
import CompanySetup from './pages/admin/CompanySetup'
import AdminJobs from './pages/admin/AdminJobs'
import PostJob from './pages/admin/PostJob'
import Applicants from './pages/admin/Applicants'
import ResumeBuilder from './pages/ResumeBuilder'
import CareerAdvice from './pages/CareerAdvice'
import { Toaster } from 'sonner'
import ProtectedRoute from './components/ProtectedRoute'
import JobSetup from './pages/admin/JobSetup' 

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { setUser } from './redux/authSlice' // apna path check karo
import { USER_API_END_POINT } from './utils/constant'

const NotFound = () => (
  <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
    <h1 className="text-6xl font-bold text-[#6A38C2]">404</h1>
    <p className="text-xl text-gray-600 mt-4">Page Not Found</p>
    <button onClick={() => window.location.href = "/"} className="mt-8 px-6 py-2 bg-[#6A38C2] text-white rounded-md">Go Home</button>
  </div>
);

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/jobs',
    element: <Jobs />
  },
  {
    path: '/description/:id',
    element: <JobDescription />
  },
  {
    path: '/browse',
    element: <Browse />
  },
  {
    path: '/profile',
    element: <Profile />
  },
  {
    path: '/resume-builder',
    element: <ResumeBuilder />
  },
  {
    path: '/career-advice',
    element: <CareerAdvice />
  },
  // admin routes
  {
    path: "/admin/companies",
    element: <ProtectedRoute><Companies /></ProtectedRoute>
  },
  {
    path: "/admin/companies/create",
    element: <ProtectedRoute><CompanyCreate /></ProtectedRoute>
  },
  {
    path: "/admin/companies/:id",
    element: <ProtectedRoute><CompanySetup /></ProtectedRoute>
  },
  {
    path: "/admin/jobs",
    element: <ProtectedRoute><AdminJobs /></ProtectedRoute>
  },
  {
    path: "/admin/jobs/create",
    element: <ProtectedRoute><PostJob /></ProtectedRoute>
  },
  {
    path: "/admin/jobs/:id",
    element: <ProtectedRoute><JobSetup /></ProtectedRoute>
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: <ProtectedRoute><Applicants /></ProtectedRoute>
  },
  {
    path: "*",
    element: <NotFound />
  }
])

function AppContent() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${USER_API_END_POINT}/profile`, {
          withCredentials: true
        });
        if (res.data.success) {
          dispatch(setUser(res.data.user));
        }
      } catch (error) {
        console.log(error)
      }
    };
    fetchUser();
  }, []);

  return (
    <>
      <RouterProvider router={appRouter} />
      <Toaster position="bottom-right" richColors />
    </>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  )
}

export default App