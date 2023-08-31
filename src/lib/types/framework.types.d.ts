export interface Item {
  name?: string;
  price: number;
  itemID: number;
  description: string;
  image: string;
}

export interface ItemToAdd {
  price: string;
  store_id: number;
  description: string;
  image: string;
}

interface ItemList {
  items: Item[];
}
