import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { selectCurrentUser } from '../redux/features/auth/authSlice';
import { usePurchaseProductMutation } from '../redux/features/purchase/purchaseApi';
import { useSellProductMutation } from '../redux/features/sell/sellApi';
import { useAppSelector } from '../redux/hooks';
import { TProduct } from '../types/item.type';
import InputField from './form/InputField';

const SellForm = ({
  item,
}: {
  item: (TProduct & { _id: string }) | undefined;
}) => {
  const { register, handleSubmit, reset } = useForm();
  const [sellProduct] = useSellProductMutation();
  const [purchaseProduct] = usePurchaseProductMutation();
  const user = useAppSelector(selectCurrentUser);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    let modifiedData;
    user?.role === 'buyer'
      ? (modifiedData = {
          ...data,
          quantity: Number(data.quantity),
          product: item?._id,
          purchaseDate: data.date,
        })
      : (modifiedData = {
          ...data,
          quantity: Number(data.quantity),
          productId: item?._id,
        });

    const toastId = toast.loading(
      `${
        user?.role === 'buyer'
          ? 'Purchase in progress...'
          : 'Selling in progress...'
      }`,
    );

    try {
      let result;
      user?.role === 'buyer'
        ? (result = await purchaseProduct(modifiedData))
        : (result = await sellProduct(modifiedData));

      if (result.data.success) {
        toast.success(
          `${
            user?.role === 'buyer'
              ? 'Product purchase successfully...'
              : 'Product sold successfully...'
          }`,
          {
            id: toastId,
            duration: 2000,
          },
        );
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
        <p>Item name: {item?.name}</p>
        <p>Quantity available: {item?.quantity}</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="text-center w-full">
        <div className="flex flex-col gap-5 mb-5">
          <InputField
            label="quantity"
            type="number"
            register={register}
            placeholder="Quantity"
            required={true}
          />
          {user?.role === 'seller' && (
            <InputField
              label="buyerName"
              type="text"
              register={register}
              placeholder="Buyer name"
              required={true}
            />
          )}

          <InputField
            label="date"
            type="date"
            register={register}
            placeholder="Date"
            required={true}
          />
        </div>
        {user?.role === 'buyer' ? (
          <button type="submit" className="btn btn-sm btn-primary">
            Buy
          </button>
        ) : (
          <button type="submit" className="btn btn-sm btn-primary">
            Sell
          </button>
        )}
      </form>
    </div>
  );
};

export default SellForm;
