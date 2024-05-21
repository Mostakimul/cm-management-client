import Dashboard from '../pages/admin/Dashboard';
import AllItems from '../pages/admin/itemManagement/AllItems';
import SingleItem from '../pages/admin/itemManagement/SingleItem';
import AllPurchase from '../pages/buyer/AllPurchase';

export const buyerPath = [
  {
    name: 'Dashboard',
    path: 'dashboard',
    element: <Dashboard />,
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
    name: 'Purchase Management',
    children: [
      {
        name: 'All Purchase',
        path: 'all-purchase',
        element: <AllPurchase />,
      },
    ],
  },
];
