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
  vendorProducts?: VendorProduct[];
}


export interface VendorProduct {
  vendor: string;
  price: number;
  url: string;
  logoUrl?: string;
}

export interface Category {
  id: string;
  name: string;
  products: Product[];
} 