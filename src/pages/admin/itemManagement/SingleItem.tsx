import { useParams } from 'react-router-dom';
import Error from '../../../components/Error';
import ProductCard from '../../../components/ProductCard';
import { useGetSingleItemQuery } from '../../../redux/features/item/itemApi';

const SingleItem = () => {
  const { id } = useParams();
  const { data, isError, isLoading } = useGetSingleItemQuery(id);
  console.log(data?.data);

  let content = null;
  if (isLoading && !isError) {
    content = <span className="loading loading-bars loading-lg"></span>;
  } else if (!isLoading && isError) {
    content = (
      <tr>
        <Error message="Error fetching data!" />
      </tr>
    );
  } else if (!isLoading && !isError && data?.data) {
    content = (
      <div className="card bg-base-100 shadow-xl p-5 w-full">
        <ProductCard data={data?.data} />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full my-5 gap-5">
      <div className="grid h-20 card bg-base-200 rounded-box place-items-center ">
        <h1 className="text-3xl font-bold">Item Details</h1>
      </div>
      <div className="grid card bg-base-200 rounded-box place-items-center p-5">
        {content}
      </div>
    </div>
  );
};

export default SingleItem;
