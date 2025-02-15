import Dashboard from '../pages/admin/Dashboard';
import AddNewItem from '../pages/admin/itemManagement/AddNewItem';
import AllItems from '../pages/admin/itemManagement/AllItems';
import SingleItem from '../pages/admin/itemManagement/SingleItem';
import UpdateItem from '../pages/admin/itemManagement/UpdateItem';
import AllSales from '../pages/admin/salesManagement/AllSales';
import SellingDetailsItem from '../pages/admin/salesManagement/SellingDetailsItem';
import MyItems from '../pages/buyer/MyItems';

export const sellerPath = [
  {
    name: 'Dashboard',
    path: 'dashboard',
    element: <Dashboard />,
  },
  {
    name: 'Item Management',
    children: [
      {
        name: 'Add Item',
        path: 'add-item',
        element: <AddNewItem />,
      },
      {
        name: 'All Items',
        path: 'all-items',
        element: <AllItems />,
      },
      {
        name: 'My Items',
        path: 'my-items',
        element: <MyItems />,
      },
      {
        name: 'Edit Item',
        path: 'edit-item/:id',
        element: <UpdateItem />,
      },
      {
        name: 'Single Item',
        path: 'single-item/:id',
        element: <SingleItem />,
      },
    ],
  },
  {
    name: 'Sales Management',
    children: [
      {
        name: 'My Sales',
        path: 'my-sales',
        element: <AllSales />,
      },
      {
        name: 'Sold Item Details',
        path: 'sold-item-details/:id',
        element: <SellingDetailsItem />,
      },
    ],
  },
];
