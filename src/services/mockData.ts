import { Category, Product, PriceHistory } from '../types';
import { API_CONFIG } from '../config/config';

const generatePriceHistory = (days: number, basePrice: number, brandName: string): PriceHistory[] => {
  const history: PriceHistory[] = [];
  const now = new Date();
  
  for (let i = 0; i < days; i += 7) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    history.push({
      timestamp: date.toISOString(),
      price: basePrice + Math.random() * 1 - 0.5,
      brandName,
    });
  }
  
  return history.reverse();
};


export const getProductsFromApi = async (): Promise<Product[]> => {
  const response = await fetch(`${API_CONFIG.baseUrl}/products`);
  const data = await response.json();
  return data.map((product: any) => {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      category: product.category[0],
      imageUrl: `http://127.0.0.1:3000/images/${product.id}.png`,
      currentPrice: product.price,
      currentBrand: product.brand,
      priceHistory: generatePriceHistory(30, product.price, product.brand),
      tags: product.tags,
    };
  });
};

export const getCategories = async (): Promise<Category[]> => {
  const products = await getProductsFromApi();
  const groupedProducts = Object.groupBy(products, (product) => product.category);
  const categories = Object.keys(groupedProducts).map((category) => {
    return {
      id: category,
      name: category,
      products: groupedProducts[category]?.map((product) => {
        return {
          id: product.id,
          name: product.name,
          description: product.description,
          category: product.category[0],
          imageUrl: product.imageUrl,
          currentPrice: product.currentPrice,
          currentBrand: product.currentBrand,
          priceHistory: product.priceHistory,
          tags: product.tags,
        };
      }) ?? [],
    };
  });

  return categories;
};

