import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useLoginMutation } from '../redux/features/auth/authApi';
import { setUser, useCurrentToken } from '../redux/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { IUserLoginInput } from '../types';
import { verifyToken } from '../utils/verifyToken';

const Login = () => {
  const token = useAppSelector(useCurrentToken);
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { register, handleSubmit, reset } = useForm<IUserLoginInput>();

  useEffect(() => {
    if (token) {
      navigate('/user/dashboard');
    }
  }, [navigate, token]);

  const onSubmit: SubmitHandler<IUserLoginInput> = async (data) => {
    const toastId = toast.loading('Log in progress...');

    try {
      const result = await login(data);
      if (result.data.data) {
        const user = await verifyToken(result.data.data.accessToken);
        dispatch(
          setUser({
            user,
            token: result.data.data.accessToken,
          }),
        );
        navigate('/user/dashboard');
        toast.success('Login successfully', { id: toastId, duration: 2000 });
      }

      reset();
    } catch (error) {
      toast.error('Something went wrong!', { id: toastId, duration: 2000 });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen page-bg">
      <div className="text-3xl my-5">Login</div>

      <form onSubmit={handleSubmit(onSubmit)} className="text-center">
        <div className="flex flex-col gap-5 mb-5">
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              {...register('email', { required: true })}
              type="text"
              className="grow"
              placeholder="Email"
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              {...register('password', { required: true })}
              type="password"
              className="grow"
              placeholder="Password"
            />
          </label>
        </div>
        <button type="submit" className="btn btn-sm btn-primary">
          Login
        </button>
      </form>
      <div className="mt-5">
        <span>Don't have an account? </span>
        <NavLink to="/register" className="link link-primary">
          Create new account.
        </NavLink>
      </div>
    </div>
  );
};

export default Login;
