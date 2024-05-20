import { format } from 'date-fns';
import { TSell } from '../types';

const SaleDetailsCard = ({ data }: { data: TSell }) => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        <p className="font-semibold">Buyer Name:</p>
        <p>{data.buyerName}</p>

        <p className="font-semibold">Quantiy sold:</p>
        <p>{data.quantity}</p>

        <p className="font-semibold">Total amount:</p>
        <p>{data.totalAmount || 'N/A'}</p>

        <p className="font-semibold">Date sold:</p>
        <p>{format(new Date(data.date), 'MM/dd/yyyy')}</p>
      </div>
    </div>
  );
};

export default SaleDetailsCard;
