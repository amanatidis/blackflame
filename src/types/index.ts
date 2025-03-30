export interface PriceHistory {
  timestamp: string;
  price: number;
  brandName: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  imageUrl: string;
  priceHistory: PriceHistory[];
  currentPrice: number;
  currentBrand: string;
  tags?: string[];
}


export interface Category {
  id: string;
  name: string;
  products: Product[];
} 