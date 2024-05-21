import { format } from 'date-fns';
import { TPurchase } from '../types';

const PurchaseItemRow = ({ item }: { item: TPurchase }) => {
  return (
    <tr className="hover">
      <td>{item.seller.email}</td>
      <td>{item.quantity}</td>
      <td>$ {item.totalAmount}</td>
      <td>{format(new Date(item.purchaseDate), 'MM/dd/yyyy')}</td>
    </tr>
  );
};

export default PurchaseItemRow;
