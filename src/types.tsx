
type Item = {
  id: number;
  type:string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  priceM:number;
  priceL:number;
  deleted: boolean;
};

type Order ={
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
  orderltemList:Date;
}

type Orderitem={
  id:number;
  itemId:number;
  orderId:number;
  quantity:number;
  size:string;
  item:Item;
}

type User ={
  id: number;
  name: string;
  email:string;
  password:string;
  zipcode:string;
  address:string;
  telephone:string;
}

export type{Order,Item,Orderitem,User};



