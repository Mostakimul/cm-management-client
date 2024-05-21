import { useParams } from 'react-router-dom';
import Error from '../../../components/Error';
import ProductCard from '../../../components/ProductCard';
import SaleDetailsCard from '../../../components/SaleDetailsCard';
import { useGetSingleSaleQuery } from '../../../redux/features/sell/sellApi';

const SellingDetailsItem = () => {
  const { id } = useParams();
  const { data, isError, isLoading } = useGetSingleSaleQuery(id);
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
      <div className="card grid grid-cols-2 gap-5 bg-base-100 shadow-xl p-5 w-full">
        <SaleDetailsCard data={data?.data} />
        <ProductCard data={data?.data.productId} />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full my-5 gap-5">
      <div className="grid h-20 card bg-base-200 rounded-box place-items-center ">
        <h1 className="text-3xl font-bold">Selling Details</h1>
      </div>
      <div className="grid card bg-base-200 rounded-box place-items-center p-5">
        {content}
      </div>
    </div>
  );
};

export default SellingDetailsItem;
