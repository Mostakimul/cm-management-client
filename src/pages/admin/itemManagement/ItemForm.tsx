import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import InputField from '../../../components/form/InputField';
import { selectCurrentUser } from '../../../redux/features/auth/authSlice';
import {
  useAddProductMutation,
  useUpdateProductMutation,
} from '../../../redux/features/item/itemApi';
import { useAppSelector } from '../../../redux/hooks';
import { TProduct } from '../../../types/item.type';

type TItemProps = {
  item?: TProduct & { _id: string };
};

const ItemForm = ({ item }: TItemProps) => {
  const { register, handleSubmit, reset, getValues } = useForm({
    defaultValues: item
      ? {
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          brand: item.brand,
          capacity: item.capacity,
          category: item.category,
          interface: item.interface,
          color: item.color,
          compatibility: item.compatibility,
          condition: item.condition,
          formFactor: item.formFactor,
        }
      : undefined,
  });
  const [addProduct] = useAddProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const navigate = useNavigate();
  const user = useAppSelector(selectCurrentUser);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log('Data ', data);
    const toastId = toast.loading('Creation in progress...');
    const convertedData = {
      ...data,
      price: Number(data.price),
      quantity: Number(data.quantity),
    };
    try {
      if (item) {
        const result = await updateProduct({
          id: item._id,
          data: convertedData,
        });
        if (result.data.success) {
          toast.success('Product created successfully', {
            id: toastId,
            duration: 2000,
          });
          navigate(`/${user}/all-items`);
        }
      } else {
        const result = await addProduct(convertedData);
        if (result.data.success) {
          toast.success('Product created successfully', {
            id: toastId,
            duration: 2000,
          });
          reset();
          navigate('/admin/all-items');
        }
      }
    } catch (error) {
      toast.error('Something went wrong!', { id: toastId, duration: 2000 });
    }
  };

  const handleVarientCreation = async () => {
    const toastId = toast.loading('Creation in progress...');
    const data = getValues();
    const convertedData = {
      ...data,
      price: Number(data.price),
      quantity: Number(data.quantity),
    };
    try {
      const result = await addProduct(convertedData);
      if (result.data.success) {
        toast.success('Product variant created successfully', {
          id: toastId,
          duration: 2000,
        });
        reset();
        navigate('/admin/all-items');
      }
    } catch (error) {
      toast.error('Something went wrong!', { id: toastId, duration: 2000 });
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="text-center w-1/3">
        <div className="flex flex-col gap-5 mb-5">
          <InputField
            label="name"
            type="text"
            register={register}
            placeholder="Name"
            required={true}
          />
          <InputField
            label="price"
            type="number"
            register={register}
            placeholder="Price"
            required={true}
          />
          <InputField
            label="quantity"
            type="number"
            register={register}
            placeholder="Quantity"
            required={true}
          />
          <InputField
            label="category"
            type="text"
            register={register}
            placeholder="Category"
            required={true}
          />
          <InputField
            label="brand"
            type="text"
            register={register}
            placeholder="Brand"
            required={true}
          />
          <InputField
            label="condition"
            type="text"
            register={register}
            placeholder="Condition"
            required={true}
          />
          <InputField
            label="compatibility"
            type="text"
            register={register}
            placeholder="Compatibility"
            required={true}
          />
          <InputField
            label="interface"
            type="text"
            register={register}
            placeholder="'USB' | 'HDMI' | 'Thunderbolt' | 'Others'"
            required={true}
          />
          <InputField
            label="capacity"
            type="text"
            register={register}
            placeholder="Capacity"
            required={false}
          />
          <InputField
            label="color"
            type="text"
            register={register}
            placeholder="Color"
            required={true}
          />
          <InputField
            label="formFactor"
            type="text"
            register={register}
            placeholder="Form Factor"
            required={false}
          />
        </div>
        <button type="submit" className="btn btn-sm btn-primary">
          {item ? 'Update Item' : 'Add Item'}
        </button>
      </form>
      <div className="flex items-center justify-center gap-5 mt-2">
        {item && (
          <button
            onClick={handleVarientCreation}
            className="btn btn-sm btn-accent"
          >
            Create Varient
          </button>
        )}
      </div>
    </>
  );
};

export default ItemForm;
