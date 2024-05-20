import { TProduct } from '../types/item.type';

const ProductCard = ({ data }: { data: TProduct }) => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        <p className="font-semibold">Product Name:</p>
        <p>{data.name}</p>

        <p className="font-semibold">Brand:</p>
        <p>{data.brand}</p>

        <p className="font-semibold">Capacity:</p>
        <p>{data.capacity || 'N/A'}</p>

        <p className="font-semibold">Category:</p>
        <p>{data.category}</p>

        <p className="font-semibold">Color:</p>
        <p>{data.color}</p>

        <p className="font-semibold">Compatibility:</p>
        <p>{data.compatibility}</p>

        <p className="font-semibold">Condition:</p>
        <p>{data.condition}</p>

        <p className="font-semibold">Form Factor:</p>
        <p>{data.formFactor || 'N/A'}</p>

        <p className="font-semibold">Interface:</p>
        <p>{data.interface}</p>

        <p className="font-semibold">Quantity:</p>
        <p>{data.quantity}</p>
      </div>
    </div>
  );
};

export default ProductCard;
