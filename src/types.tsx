export type Item = {
  id: number;
  type: string;
  name: string;
  description: string;
  price: number;
  image_path: string;
  priceM: number;
  priceL: number;
  deleted: boolean;
};

export type Order = {
  id: number;
  userId: number;
  status: number;
  totalPrice: number;
  orderDate: Date;
  distenationName: string;
  distenationEmail: string;
  distenationZipcode: string;
  distenationAddress: string;
  distenationTel: string;
  deliveryTime: Date;
  paymentMethod: number;
  user: User;
  orderItemList: Orderitem;
};

export type Orderitem = {
  map(arg0: (f: Item) => number): any;
  forEach(arg0: (f: Item) => number): any;
  id: number;
  itemId: number;
  orderId: number;
  quantity: number;
  size: string;
  item: Item;
};

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmationPassword: string;
  zipcode: string;
  prefecture: string;
  city: string;
  aza: string;
  building: string;
  telephone: string;
  logined: boolean;
};

export type CartItem = {
  id: number;
  userId: number;
  items: Item[];
};

export type Option = {
  id: number;
  name: string;
  price: number;
};

export type OrderOption = {
  id: number;
  optionId: number;
  cartItemID: number;
  option: Option;
};
