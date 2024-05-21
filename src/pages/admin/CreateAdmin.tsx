import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useCreateAdminMutation } from '../../redux/features/user/userApi';
import { IUserRegisterInput } from '../../types';

const CreateAdmin = () => {
  const { register, handleSubmit, reset } = useForm<IUserRegisterInput>();
  const [createAdmin] = useCreateAdminMutation();

  const onSubmit: SubmitHandler<IUserRegisterInput> = async (data) => {
    const toastId = toast.loading('Registration in progress...');

    try {
      const result = await createAdmin(data);

      if (result.data.success === true) {
        toast.success('Admin added successfully', {
          id: toastId,
          duration: 2000,
        });
      }
      reset();
    } catch (error) {
      toast.error('Something went wrong!', { id: toastId, duration: 2000 });
    }
  };

  return (
    <div className="flex flex-col w-full my-5 gap-5">
      <div className="grid h-20 card bg-base-200 rounded-box place-items-center ">
        <h1 className="text-3xl font-bold">Add Admin</h1>
      </div>

      <div className="grid card bg-base-200 rounded-box place-items-center p-5">
        <div className="overflow-x-auto w-full">
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
              Add Admin
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAdmin;
