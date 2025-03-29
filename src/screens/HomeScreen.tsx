import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { Category, Product } from '../types';
import { getCategories } from '../services/mockData';

const { width } = Dimensions.get('window');

const ProductCard = ({ product, onPress }: { product: Product; onPress: () => void }) => (
  <TouchableOpacity style={styles.productCard} onPress={onPress}>
    <Image source={{ uri: product.imageUrl }} style={styles.productImage} />
    <View style={styles.productInfo}>
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productPrice}>€{product.currentPrice.toFixed(2)}</Text>
      <Text style={styles.productBrand}>{product.currentBrand}</Text>
    </View>
  </TouchableOpacity>
);

const CategorySection = ({ category, onProductPress }: { category: Category; onProductPress: (product: Product) => void }) => (
  <View style={styles.categorySection}>
    <Text style={styles.categoryTitle}>{category.name}</Text>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {category.products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onPress={() => onProductPress(product)}
        />
      ))}
    </ScrollView>
  </View>
);

const HomeScreen = ({ navigation }: any) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const loadCategories = async () => {
      const data = await getCategories();
      setCategories(data);
    };
    loadCategories();
  }, []);

  const handleProductPress = (product: Product) => {
    navigation.navigate('ProductDetail', { product });
  };

  return (
    <ScrollView style={styles.container}>
      {categories.map((category) => (
        <CategorySection
          key={category.id}
          category={category}
          onProductPress={handleProductPress}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  categorySection: {
    marginVertical: 16,
  },
  categoryTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 16,
    marginBottom: 12,
  },
  productCard: {
    width: width * 0.7,
    backgroundColor: 'white',
    borderRadius: 12,
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 18,
    color: '#2196F3',
    fontWeight: 'bold',
  },
  productBrand: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});

export default HomeScreen; 