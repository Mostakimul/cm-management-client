import { useParams } from 'react-router-dom';
import { useGetSingleItemQuery } from '../../../redux/features/item/itemApi';
import ItemForm from './ItemForm';

const UpdateItem = () => {
  const { id } = useParams();
  const { data } = useGetSingleItemQuery(id);

  return (
    <div className="flex flex-col w-full my-5 gap-5">
      <div className="grid h-20 card bg-base-200 rounded-box place-items-center ">
        <h1 className="text-3xl font-bold">Update Item</h1>
      </div>
      <div className="grid card bg-base-200 rounded-box place-items-center p-5">
        {data?.data && <ItemForm item={data?.data} />}
      </div>
    </div>
  );
};

export default UpdateItem;
