import Dashboard from '../pages/user/Dashboard';
import AddNewItem from '../pages/user/itemManagement/AddNewItem';
import AllItems from '../pages/user/itemManagement/AllItems';
import SingleItem from '../pages/user/itemManagement/SingleItem';
import UpdateItem from '../pages/user/itemManagement/UpdateItem';
import AllSales from '../pages/user/salesManagement/AllSales';
import SellingDetailsItem from '../pages/user/salesManagement/SellingDetailsItem';

export const userPaths = [
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
        name: 'All Sales',
        path: 'all-sales',
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
