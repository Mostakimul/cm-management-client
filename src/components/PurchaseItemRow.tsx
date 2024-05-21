import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { selectCurrentUser } from '../redux/features/auth/authSlice';
import { useAppSelector } from '../redux/hooks';
import { TPurchase } from '../types';

const PurchaseItemRow = ({
  item,
  generateModal,
}: {
  item: TPurchase;
  generateModal: (item: TPurchase) => void;
}) => {
  const navigate = useNavigate();
  const user = useAppSelector(selectCurrentUser);

  const handleClick = () => {
    generateModal(item);
  };

  return (
    <tr className="hover">
      <td>{item.product.name}</td>
      <td>{item.seller.email}</td>
      <td>{item.quantity}</td>
      <td>$ {item.totalAmount}</td>
      <td>{format(new Date(item.purchaseDate), 'MM/dd/yyyy')}</td>
      <td className="space-x-3">
        <button
          onClick={() =>
            navigate(`/${user?.role}/single-item/${item.product._id}`)
          }
          className="btn btn-sm btn-outline btn-primary"
        >
          Show Product Details
        </button>

        <button className="btn btn-sm btn-outline" onClick={handleClick}>
          Request Servicing
        </button>
      </td>
    </tr>
  );
};

export default PurchaseItemRow;
