import { useNavigate } from 'react-router-dom';
import { TProduct } from '../types/item.type';

type TTableRowProps = {
  row: TProduct & { _id: string };
  handleDelete: (id: string) => void;
  handleEdit: (id: string) => void;
  handleIdSelect: (id: string) => void;
  generateModal: (item: TProduct & { _id: string }) => void;
};

const ItemTableRow = ({
  row,
  handleDelete,
  handleEdit,
  handleIdSelect,
  generateModal,
}: TTableRowProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    generateModal(row);
  };

  return (
    <tr className="hover">
      <th>
        <label>
          <input
            onChange={() => handleIdSelect(row._id)}
            type="checkbox"
            className="checkbox"
          />
        </label>
      </th>
      <td>{row.name}</td>
      <td>{row.brand}</td>
      <td>$ {row.price}</td>
      <td>{row.quantity}</td>
      <td>{row.category}</td>
      <td>{row.condition}</td>
      <td>{row.compatibility}</td>
      <td className="space-x-3">
        <button
          onClick={() => handleEdit(row._id)}
          className="btn btn-sm btn-outline btn-primary"
        >
          Edit & Variant
        </button>
        <button
          onClick={() => handleDelete(row._id)}
          className="btn btn-sm btn-outline btn-error"
        >
          Delete
        </button>
        <button className="btn btn-sm btn-outline" onClick={handleClick}>
          Sell
        </button>
        <button
          className="btn btn-sm btn-outline btn-accent"
          onClick={() => navigate(`/user/single-item/${row._id}`)}
        >
          Show Details
        </button>
      </td>
    </tr>
  );
};

export default ItemTableRow;
