import 'reset-css';
import './style.scss';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Auth from './pages/Auth';
import { Provider } from 'react-redux';
import { store } from './redux/store';

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
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <RouterProvider router={routes} />
  </Provider>
);
