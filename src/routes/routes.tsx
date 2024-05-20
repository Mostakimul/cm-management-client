import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import ProtectedRoute from '../layouts/ProtectedRoute';
import Login from '../pages/Login';
import Register from '../pages/Register';
import { userPaths } from './user.routes';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/user',
    element: (
      <ProtectedRoute role="user">
        <App />
      </ProtectedRoute>
    ),
    children: userPaths,
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
