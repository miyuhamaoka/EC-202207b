import { NextApiRequest, NextApiResponse } from 'next';


//カートに入れるボタンを押した時に呼ばれるAPI
//POST：カートに入れるボタンを押した時の処理画面にJSONを返す？(商品詳細画面で実行)
//PATCH：削除バタンが押された時の処理(ショッピングカートで実行)
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<CartItem>
) {
    if(req.method === 'POST'){
        return 

    }
    else  if(req.method === 'PATCH'){
        return 
        
    }
}


type CartItem = {
    id: number;
    userId: number;
    items: [
  
    ];
  };
  
  type Item ={
      id: number;
      name: string;
      description: string;
      price: number;
      quantity:number;
      imagePath: string;
      options: [
        {
          id: number;
          name: string;
          price: number;
        }
      ];
    }
  
  export type{CartItem,Item}
  
