import { useState } from 'react';
import Error from '../../components/Error';
import Modal from '../../components/Modal';
import Pagination from '../../components/Pagination';
import PurchaseItemRow from '../../components/PurchaseItemRow';
import ServiceForm from '../../components/ServiceForm';
import SelectField from '../../components/form/SelectField';
import { timeFrames } from '../../constants/constants';
import { useGetAllPurchaseQuery } from '../../redux/features/purchase/purchaseApi';
import { TPurchase } from '../../types';

const AllPurchase = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterValues, setFilterValues] = useState<{ [key: string]: string }>(
    {},
  );
  const [purchasedItem, setPurchasedItem] = useState<TPurchase>();

  /**
   * rtk  queries
   */
  const { data, isLoading, isError } = useGetAllPurchaseQuery({
    page: currentPage,
    limit: 5,
    ...filterValues,
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleOnchange = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target;

    setFilterValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const generateModal = (purchaseItem: TPurchase) => {
    const modal = document.getElementById('my_modal_5') as HTMLDialogElement;
    modal.showModal();
    setPurchasedItem(purchaseItem);
  };

  let content = null;
  if (isLoading && !isError) {
    content = <tr className="loading loading-bars loading-lg"></tr>;
  } else if (!isLoading && isError) {
    content = (
      <tr>
        <Error message="Error fetching data!" />
      </tr>
    );
  } else if (!isLoading && !isError && data?.data.length > 0) {
    content = data?.data.map((item: TPurchase) => (
      <PurchaseItemRow
        key={item._id}
        item={item}
        generateModal={generateModal}
      />
    ));
  }

  return (
    <div className="flex flex-col w-full my-5 gap-5">
      <div className="grid h-20 card bg-base-200 rounded-box place-items-center ">
        <h1 className="text-3xl font-bold">All Purchase</h1>
      </div>
      <div className="flex flex-row justify-between items-center card bg-base-200 rounded-box p-3">
        <div>
          <span className="label-text">Search</span>
          <label className="input input-bordered input-info flex items-center gap-2">
            <input
              type="text"
              name="searchTerm"
              onChange={handleOnchange}
              className="grow placeholder-slate-700"
              placeholder="Search..."
            />
          </label>
        </div>

        <div className="flex-1 flex justify-center items-center gap-5">
          <SelectField
            name="timeFrame"
            label="Time Frame"
            options={timeFrames}
            required={true}
            onChange={handleOnchange}
          />
        </div>
      </div>
      <div className="w-full flex justify-end">
        <button
          onClick={() => setFilterValues({})}
          className="btn btn-sm btn-outline btn-warning"
        >
          Reset Filters
        </button>
      </div>
      <div className="grid card bg-base-200 rounded-box place-items-center p-5">
        <div className="overflow-x-auto w-full">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Product</th>
                <th>Seller Email</th>
                <th>Quantity</th>
                <th>Total Price</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{content}</tbody>
          </table>
        </div>

        {data && (
          <Pagination meta={data?.meta} onPageChange={handlePageChange} />
        )}
      </div>
      <Modal>
        <ServiceForm item={purchasedItem} />
      </Modal>
    </div>
  );
};

export default AllPurchase;
