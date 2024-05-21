import { TProduct } from './item.type';

export type TQueryParam = {
  [key: string]: string | number | boolean;
};

export type TUserType = {
  _id: string;
  email: string;
  role: string;
  status: string;
  isDeleted: boolean;
};

export type TPurchase = {
  _id: string;
  product: TProduct & { _id: string };
  buyer: TUserType;
  seller: TUserType;
  quantity: number;
  totalAmount: number;
  purchaseDate: string;
};
