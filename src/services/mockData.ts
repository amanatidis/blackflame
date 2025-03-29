import { Category, Product, PriceHistory } from '../types';

const generatePriceHistory = (days: number, basePrice: number, brandName: string): PriceHistory[] => {
  const history: PriceHistory[] = [];
  const now = new Date();
  
  for (let i = 0; i < days; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    history.push({
      timestamp: date.toISOString(),
      price: basePrice + Math.random() * 100 - 50,
      brandName,
    });
  }
  
  return history.reverse();
};

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Smartphone X',
    description: 'Latest smartphone with advanced features',
    category: 'Electronics',
    imageUrl: 'https://picsum.photos/200',
    currentPrice: 999.99,
    currentBrand: 'TechStore',
    priceHistory: generatePriceHistory(30, 999.99, 'TechStore'),
  },
  {
    id: '2',
    name: 'Laptop Pro',
    description: 'High-performance laptop for professionals',
    category: 'Electronics',
    imageUrl: 'https://picsum.photos/201',
    currentPrice: 1499.99,
    currentBrand: 'DigitalHub',
    priceHistory: generatePriceHistory(30, 1499.99, 'DigitalHub'),
  },
  {
    id: '3',
    name: 'Wireless Headphones',
    description: 'Premium wireless headphones with noise cancellation',
    category: 'Audio',
    imageUrl: 'https://picsum.photos/202',
    currentPrice: 299.99,
    currentBrand: 'SoundMaster',
    priceHistory: generatePriceHistory(30, 299.99, 'SoundMaster'),
  },
];

export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Electronics',
    products: mockProducts.filter(p => p.category === 'Electronics'),
  },
  {
    id: '2',
    name: 'Audio',
    products: mockProducts.filter(p => p.category === 'Audio'),
  },
];

export const getCategories = (): Promise<Category[]> => {
  return Promise.resolve(mockCategories);
};

export const getProductById = (id: string): Promise<Product | undefined> => {
  const product = mockProducts.find(p => p.id === id);
  return Promise.resolve(product);
}; 