
import './App.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Pages/Home/home.jsx';
import About from './Pages/About/about.jsx';
import Mobile from './Pages/Services/Mobile_Application/mobile.jsx';
import Web from './Pages/Services/Web_Application/web.jsx';
import Client from './Pages/Our Clients/client.jsx';
import Workingspace from './Pages/Co working space/workingspace.jsx';
import Policy from './Pages/Careers/Career policy/policy.jsx';
import Openings from './Pages/Careers/Job openings/openings.jsx';
import Contact from './Pages/Contact Us/contactus.jsx';
import Rental from './Pages/Laptop rental/rental.jsx';
import Developer from './Pages/Hire Developers/developers.jsx';
import Search from './Pages/Search/search.jsx';
import Services from './Pages/Services/service.jsx';
function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/About",
      element: <About />,
    },

    {
      path: "/Services/Mobile-Application",
      element: <Mobile />
    },
    {
      path: "/Services/Web-Application",
      element: <Web />
    },
    {
      path: "/Our-Clients",
      element: <Client />
    },
    {
      path: "/Co-working-Space",
      element: <Workingspace />
    },
    {
      path: "/Careers/Career-Policy",
      element: <Policy />
    },
    {
      path: "/Careers/Job-Openings",
      element: <Openings />
    },
    {
      path: "/Contact-us",
      element: <Contact />
    },
    {
      path: "/Laptop-Rental",
      element: <Rental />
    },
    {
      path: "/Hire-Developers",
      element: <Developer />
    },
    {
      path:"/search",
      element:<Search/>
    },
    {
      path:"/services",
      element:<Services/>
    }

  ])

  
  return (
    <div className="App">
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;
