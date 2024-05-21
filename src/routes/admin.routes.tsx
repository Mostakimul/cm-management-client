import CreateAdmin from '../pages/admin/CreateAdmin';
import Dashboard from '../pages/admin/Dashboard';
import AllItems from '../pages/admin/itemManagement/AllItems';
import SingleItem from '../pages/admin/itemManagement/SingleItem';
import AllSales from '../pages/admin/salesManagement/AllSales';
import SellingDetailsItem from '../pages/admin/salesManagement/SellingDetailsItem';

export const adminPath = [
  {
    name: 'Dashboard',
    path: 'dashboard',
    element: <Dashboard />,
  },
  {
    name: 'Create Admin',
    path: 'create-admin',
    element: <CreateAdmin />,
  },
  {
    name: 'Item Management',
    children: [
      {
        name: 'All Items',
        path: 'all-items',
        element: <AllItems />,
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
