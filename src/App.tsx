import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './layouts/ProtectedRoute';
import { selectCurrentUser } from './redux/features/auth/authSlice';
import { useAppSelector } from './redux/hooks';

function App() {
  const user = useAppSelector(selectCurrentUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate('/login');
    }
  }, [navigate, user]);

  return (
    <ProtectedRoute role={undefined}>
      <MainLayout />
    </ProtectedRoute>
  );
}

export default App;
