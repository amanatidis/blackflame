import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import { Category, Product } from '../types';
import { getCategories } from '../services/mockData';
import { useAuth } from '../context/AuthContext';
import { Header, Icon } from 'react-native-elements';

const { width } = Dimensions.get('window');

const ProductCard = ({ product, onPress }: { product: Product; onPress: () => void }) => (
  <TouchableOpacity 
    style={[styles.productCard, { pointerEvents: 'auto' }]} 
    onPress={onPress}
  >
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
  const { user } = useAuth();

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
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>
            Welcome{user?.name ? `, ${user.name}` : ''}!
          </Text>
        </View>
        {categories.map((category) => (
          <CategorySection
            key={category.id}
            category={category}
            onProductPress={handleProductPress}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  welcomeSection: {
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
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
    width: 256,
    backgroundColor: 'white',
    borderRadius: 12,
    marginHorizontal: 8,
  },
  productImage: {
    width: 256,
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