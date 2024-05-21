import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useAddServicingMutation } from '../redux/features/servicing/servicingApi';
import { TPurchase } from '../types';
import InputField from './form/InputField';

const ServiceForm = ({ item }: { item: TPurchase | undefined }) => {
  const { register, handleSubmit, reset } = useForm();
  const [addServicing] = useAddServicingMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const modifiedData = {
      ...data,
      partsDetails: item?.product.name,
    };

    const toastId = toast.loading(`Servicing request in progress...`);

    try {
      const result = await addServicing(modifiedData);

      if (result.data.success) {
        toast.success(`Servicing request added...`, {
          id: toastId,
          duration: 2000,
        });
        reset();
      }
    } catch (error) {
      toast.error('Something went wrong!', { id: toastId, duration: 2000 });
    }
  };

  return (
    <div>
      <div className="grid py-3 mb-3 card bg-base-200 rounded-box place-items-center ">
        <h1 className="text-xl font-bold">Item Details</h1>
      </div>
      <div className="mb-5">
        <p>Item name: {item?.product.name}</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="text-center w-full">
        <div className="flex flex-col gap-5 mb-5">
          <InputField
            label="issue"
            type="text"
            register={register}
            placeholder="Issue"
            required={true}
          />

          <InputField
            label="serviceDate"
            type="date"
            register={register}
            placeholder="Service Date"
            required={true}
          />
        </div>

        <button type="submit" className="btn btn-sm btn-primary">
          Request Service
        </button>
      </form>
    </div>
  );
};

export default ServiceForm;
