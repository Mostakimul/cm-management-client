import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import ProtectedRoute from '../layouts/ProtectedRoute';
import Login from '../pages/Login';
import Register from '../pages/Register';
import { adminPath } from './admin.routes';
import { buyerPath } from './buyer.routes';
import { sellerPath } from './seller.routes';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute role="admin">
        <App />
      </ProtectedRoute>
    ),
    children: adminPath,
  },
  {
    path: '/buyer',
    element: (
      <ProtectedRoute role="buyer">
        <App />
      </ProtectedRoute>
    ),
    children: buyerPath,
  },
  {
    path: '/seller',
    element: (
      <ProtectedRoute role="seller">
        <App />
      </ProtectedRoute>
    ),
    children: sellerPath,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
]);

export default router;
