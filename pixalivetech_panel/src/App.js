import { createBrowserRouter, RouterProvider, Navigate, Outlet } from "react-router-dom";
import Login from "./Pages/Login/login";
import Dashboard from "./Pages/Dashboard/dashboard";
import ContactUs from "./Pages/Contact us/contactUs.jsx";
import Ourclients from "./Pages/Our clients/ourClients.jsx";
import { isAuthenticated } from "./Utils/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import ViewContact from "./Pages/Contact us/viewContact.jsx";
import ViewClient from "./Pages/Our clients/viewClients.jsx";
import EditClient from "./Pages/Our clients/editCients.jsx";
import Laptoprental from "./Pages/Lap rental/laptopRental.jsx";
import ViewLaptop from "./Pages/Lap rental/viewRental.jsx";
import EditLaptop from "./Pages/Lap rental/editRental.jsx";
import Services from "./Pages/Services/services.jsx";
import ViewServices from "./Pages/Services/viewServices.jsx";
import Editservices from "./Pages/Services/editServices.jsx";
import Spaces from "./Pages/Co-working space/space.jsx";
import ViewSpace from "./Pages/Co-working space/viewSpace.jsx";
import EditSpace from "./Pages/Co-working space/editSpace.jsx";
import Openings from "./Pages/Job openings/openings.jsx";
import ViewOpenings from "./Pages/Job openings/viewOpening.jsx";
import EditOpening from "./Pages/Job openings/editOpening.jsx";
import Developers from "./Pages/Hire developers/developers.jsx";
import ViewDeveloper from "./Pages/Hire developers/viewDevelopers.jsx";
import EditDeveloper from "./Pages/Hire developers/editDevelopers.jsx";
import ApplyList from "./Pages/Applies/apply.jsx";
import ViewApply from "./Pages/Applies/viewApply.jsx"
// Protected Route Component
const ProtectedRoute = ({ element }) => {
  useEffect(() => {
    if (!isAuthenticated()) {
      toast.error("You are not logged in!", { position: "top-right", autoClose: 3000 });
    }
  }, []);

  return isAuthenticated() ? element : <Navigate to="/" replace />;
};

// Contact Us Layout
const Layout = () => (
  <>
    <Outlet />
  </>
);



// Define routes
const routes = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute element={<Dashboard />} />,
  },
  {
    path: "/contactus",
    element: <ProtectedRoute element={<Layout />} />,
    children: [
      {
        index: true, // Default child route for "/contactus"
        element: <ContactUs />,
      },
      {
        path: "viewcontact", // No leading slash needed
        element: <ProtectedRoute element={<ViewContact />} />,
      },
    ],
  },
  {
    path: "/ourclients",
    element: <ProtectedRoute element={<Layout />} />,
    children: [
      {
        index: true, // Default child route for "/ourclients"
        element: <Ourclients />,
      },
      {
        path: "viewclient", // No leading slash needed
        element: <ProtectedRoute element={<ViewClient />} />,
      },
      {
        path: "editclient", // No leading slash needed
        element: <ProtectedRoute element={<EditClient />} />,
      }
    ],
  },
  {
    path:"/laptoprental",
    element:<ProtectedRoute element={<Layout />} />,
    children:[
      {
        index:true,
        element:<Laptoprental/>
      },
      {
        path:"viewlaptop",
        element:<ProtectedRoute element={<ViewLaptop/>}/>
      },
      {
        path:"editlaptop",
        element:<ProtectedRoute element={<EditLaptop/>}/>
      }
    ]
  },
  {
     path:"/services",
     element:<ProtectedRoute element={<Layout />} />,
     children:[
      {
        index:true,
        element:<Services/>
      },
      {
        path:"viewService",
        element:<ProtectedRoute element={<ViewServices/>}/>
      },
      {
        path:"editService",
        element:<ProtectedRoute element={<Editservices/>}/>
      }
    ]
  },
  {
    path:"/coworkingspace",
    element:<ProtectedRoute element={<Layout />} />,
    children:[
      {
        index:true,
        element:<ProtectedRoute element={<Spaces/>}/>
      },
      {
        path:"viewSpace",
        element:<ProtectedRoute element={<ViewSpace/>}/>
      },
      {
        path:"editSpace",
        element:<ProtectedRoute element={<EditSpace/>}/>
      }
    ]
  },
  {
    path:"/jobopenings",
    element:<ProtectedRoute element={<Layout />} />,
    children:[
      {
        index:true,
        element:<ProtectedRoute element={<Openings/>}/>
      },
      {
        path:"viewOpening",
        element:<ProtectedRoute element={<ViewOpenings/>}/>
      },
      {
        path:"editOpening",
        element:<ProtectedRoute element={<EditOpening/>}/>
      }
    ]

  },
  {
    path:"/hiredevelopers",
    element:<ProtectedRoute element={<Layout />} />,
    children:[
      {
        index:true,
        element:<ProtectedRoute element={<Developers/>}/>
      },
      {
        path:"viewDeveloper",
        element:<ProtectedRoute element={<ViewDeveloper/>}/>
      },
      {
        path:"editDeveloper",
        element:<ProtectedRoute element={<EditDeveloper/>}/>
      }
    ]
  },
  {
    path:"/applies",
    element:<ProtectedRoute element={<Layout />} />,
    children:[
      {
        index:true,
        element:<ProtectedRoute element={<ApplyList/>}/>
      },
      {
        path:"viewApply",
        element:<ProtectedRoute element={<ViewApply/>}/>
      },
    ]
  }

]);

// App Component
function App() {
  return (
    <div className="App">
      <ToastContainer />
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;
