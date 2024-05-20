import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { selectCurrentUser } from '../redux/features/auth/authSlice';
import { useAppSelector } from '../redux/hooks';
import { TSell } from '../types';

type TTableRowProps = {
  row: TSell;
};
const SoldItemRow = ({ row }: TTableRowProps) => {
  const navigate = useNavigate();
  const user = useAppSelector(selectCurrentUser);
  return (
    <tr className="hover">
      <td>{row.buyerName}</td>
      <td>{row.quantity}</td>
      <td>$ {row.totalAmount}</td>
      <td>{format(new Date(row.date), 'MM/dd/yyyy')}</td>
      <td className="space-x-3">
        <button
          onClick={() =>
            navigate(`/${user?.role}/sold-item-details/${row._id}`)
          }
          className="btn btn-sm btn-outline btn-primary"
        >
          Show Details
        </button>
      </td>
    </tr>
  );
};

export default SoldItemRow;
