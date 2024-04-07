import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <RouterProvider router={routes} />
  </Provider>
);
