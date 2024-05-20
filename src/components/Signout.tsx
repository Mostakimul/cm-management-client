import { logout } from '../redux/features/auth/authSlice';
import { useAppDispatch } from '../redux/hooks';

const Signout = () => {
  const dispatch = useAppDispatch();
  return (
    <button
      onClick={() => dispatch(logout())}
      className="btn btn-sm btn-outline btn-error"
    >
      Logout
    </button>
  );
};

export default Signout;
