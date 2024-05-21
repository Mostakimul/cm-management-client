import { TUserType } from './global';

export type TProduct = {
  name: string;
  price: number;
  quantity: number;
  category: string;
  brand: string;
  condition: string;
  compatibility: string;
  interface: string;
  capacity?: string;
  color: string;
  formFactor?: string;
  seller: TUserType;
};
