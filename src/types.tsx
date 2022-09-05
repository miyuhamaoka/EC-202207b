import { type } from "os";


export type Item = {
  id: number;
  type:string;
  name: string;
  description: string;
  price: number;
  image_path: string;
  priceM:number;
  priceL:number;
  deleted: boolean;
};

export type Order ={
  id: number;
  userId:number;
  status:number;
  totalPrice:number;
  orderDate:Date;
  distenationName:string;
  distenationEmail:string;
  distenationZipcode:string;
  distenationAddress:string
  distenationTel:string;
  deliveryTime:Date;
  paymentMethod:number;
  user:User;
  orderltemList:Orderitem;
}

export type Orderitem={
  id:number;
  itemId:number;
  orderId:number;
  quantity:number;
  size:string;
  item:Item;
}

export type User ={
  id: number;
  name: string;
  email:string;
  password:string;
  confirmationPassword:string;
  zipcode:string;
  address:string;
  telephone:string;
  logined:boolean;
}

export type CartItem = {
  id: number;
  userId: number;
  items: Item[];
};

export type Option = {
   id: number;
   name: string;
  //  price: number
}

export type OrderOption = {
  id: number;
  optionId: number;
  cartItemID: number;
  option: Option
}
