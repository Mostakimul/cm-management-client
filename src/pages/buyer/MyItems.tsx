import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Error from '../../components/Error';
import ItemTableRow from '../../components/ItemTableRow';
import Modal from '../../components/Modal';
import Pagination from '../../components/Pagination';
import SellForm from '../../components/SellForm';
import SelectField from '../../components/form/SelectField';
import { selectCurrentUser } from '../../redux/features/auth/authSlice';
import {
  useBulkDeleteItemMutation,
  useDeleteItemMutation,
  useGetAllFiltersQuery,
  useGetMyItemsQuery,
} from '../../redux/features/item/itemApi';
import {
  selectCapacity,
  selectCategories,
  selectConditions,
  selectInterfaces,
  setCapacity,
  setCategory,
  setCondition,
  setInterface,
} from '../../redux/features/item/itemSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { TProduct } from '../../types/item.type';
import itemManagement from '../../utils/itemManagement';

const MyItems = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const [filterValues, setFilterValues] = useState<{ [key: string]: string }>(
    {},
  );
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [sellingItem, setSellingItem] = useState<TProduct & { _id: string }>();
  const user = useAppSelector(selectCurrentUser);

  /**
   * rtk  queries
   */
  const { data, isLoading, isError } = useGetMyItemsQuery({
    page: currentPage,
    limit: 5,
    ...filterValues,
  });
  const { data: filters } = useGetAllFiltersQuery(undefined);
  const [deleteItem, { isSuccess }] = useDeleteItemMutation();
  const [bulkDeleteItem] = useBulkDeleteItemMutation();
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const interfaces = useAppSelector(selectInterfaces);
  const conditions = useAppSelector(selectConditions);
  const capacity = useAppSelector(selectCapacity);

  useEffect(() => {
    if (filters?.data) {
      dispatch(
        setCategory(itemManagement.getFiltersArray(filters?.data?.categories)),
      );
      dispatch(
        setCapacity(itemManagement.getFiltersArray(filters?.data?.capacity)),
      );
      dispatch(
        setInterface(itemManagement.getFiltersArray(filters?.data?.interfaces)),
      );
      dispatch(
        setCondition(itemManagement.getFiltersArray(filters?.data?.condition)),
      );
    }
  }, [dispatch, filters?.data]);

  const handleSelectedIds = (id: string) => {
    if (!selectedIds.includes(id)) {
      setSelectedIds((prevIds) => [...prevIds, id]);
    } else {
      const filteredIds = selectedIds.filter((item) => item !== id);
      setSelectedIds(filteredIds);
    }
  };

  const handleBulkDelete = async () => {
    try {
      await bulkDeleteItem(selectedIds);
      if (isSuccess) {
        toast.success('Products deleted successfully!');
      }
      setSelectedIds([]);
    } catch (error) {
      toast.error('Something went wrong!');
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteItem(id);
      if (isSuccess) {
        toast.success('Product deleted successfully!');
      }
    } catch (error) {
      toast.error('Something went wrong!');
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/${user?.role}/edit-item/${id}`);
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

  const generateModal = (detailedProduct: TProduct & { _id: string }) => {
    const modal = document.getElementById('my_modal_5') as HTMLDialogElement;
    modal.showModal();
    setSellingItem(detailedProduct);
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
    content = data?.data.map((item: TProduct & { _id: string }) => (
      <ItemTableRow
        key={item._id}
        row={item}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        handleIdSelect={handleSelectedIds}
        generateModal={generateModal}
      />
    ));
  }

  return (
    <div className="flex flex-col w-full my-5 gap-5">
      <div className="grid h-20 card bg-base-200 rounded-box place-items-center ">
        <h1 className="text-3xl font-bold">All Items</h1>
      </div>
      <div className="flex flex-row justify-between items-center card bg-base-200 rounded-box p-3">
        <div className="mr-2">
          <span className="label-text">Search</span>
          <label className="input input-bordered input-info flex items-center gap-2 mt-3">
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
          {categories?.length && (
            <SelectField
              name="category"
              label="Category"
              options={categories}
              required={true}
              onChange={(e) => handleOnchange(e)}
            />
          )}
          {interfaces?.length && (
            <SelectField
              name="interface"
              label="Interface"
              options={interfaces}
              required={true}
              onChange={(e) => handleOnchange(e)}
            />
          )}
          {conditions?.length ? (
            <SelectField
              name="condition"
              label="Condition"
              options={conditions}
              required={true}
              onChange={(e) => handleOnchange(e)}
            />
          ) : null}
          {capacity?.length ? (
            <SelectField
              name="capacity"
              label="Capacity"
              options={capacity}
              required={true}
              onChange={handleOnchange}
            />
          ) : null}
          <div>
            <span className="label-text">Max Price</span>
            <label className="input input-bordered input-info flex items-center gap-2 mt-3">
              <input
                type="number"
                name="price"
                onChange={handleOnchange}
                className="grow placeholder-slate-700"
                placeholder="Max price"
              />
            </label>
          </div>
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
                {user?.role === 'admin' && <th>#</th>}
                <th>Name</th>
                <th>Brand</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Category</th>
                <th>Condition</th>
                <th>Compatibility</th>
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

      {user?.role === 'seller' && (
        <div>
          <button
            onClick={handleBulkDelete}
            disabled={selectedIds.length < 1}
            className="btn btn-sm btn-error"
          >
            Delete Bulk
          </button>
        </div>
      )}

      <Modal>
        <SellForm item={sellingItem} />
      </Modal>
    </div>
  );
};

export default MyItems;
