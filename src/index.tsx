import 'reset-css';
import './style.scss';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Auth from './pages/Auth';
import About from './pages/About';
import Contacts from './pages/Contacts';
import Profile from './pages/Profile';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Processes from './pages/Processes';
import Process from './pages/Process';

const isAuth = Boolean(localStorage.getItem('userId'));

const routes = createBrowserRouter([
  {
    path: '/',
    element: isAuth ? <Home /> : <Auth />,
  },
  {
    path: '/auth',
    element: <Auth />,
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/contacts',
    element: <Contacts />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/processes',
    element: <Processes />,
  },
  {
    path: '/processes/:id',
    element: <Process />,
  },
  {
    path: '*',
    element: <div>404</div>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <Provider store={store}>
    <RouterProvider router={routes} />
  </Provider>
);
