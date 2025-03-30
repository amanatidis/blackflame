import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Category, Product } from '../types';
import { getCategories } from '../services/mockData';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { getThemeColors, spacing, typography } from '../theme/theme';
import { Layout } from '../components/Layout';

const Tag = ({ text, colors }: { text: string; colors: any }) => (
  <View style={[styles.tagContainer, { backgroundColor: colors.tagBackground, borderColor: colors.tagBorder }]}>
    <Text style={[styles.tagText, { color: colors.tagText }]}>{text}</Text>
  </View>
);

const ProductCard = ({ product, onPress }: { product: Product; onPress: () => void }) => {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);

  return (
    <TouchableOpacity 
      style={[styles.productCard, { backgroundColor: colors.card, pointerEvents: 'auto' }]} 
      onPress={onPress}
    >
      <View style={styles.productContent}>
        <Image source={{ uri: product.imageUrl }} style={styles.productImage} />
        <View style={styles.vendorPrices}>
          {product.vendorProducts?.map((vendorProduct, index) => (
            <TouchableOpacity 
              key={index}
              style={styles.vendorPriceItem}
              onPress={() => window.open(vendorProduct.url, '_blank')}
            >
              <View style={styles.vendorPriceRow}>
                <Text style={[styles.vendorName, { color: colors.text }]} numberOfLines={1}>{vendorProduct.vendor}</Text>
                <Text style={[styles.vendorPrice, { color: colors.primary }]}>€{vendorProduct.price.toFixed(2)}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.productInfo}>
        <Text style={[styles.productName, { color: colors.text }]}>{product.name}</Text>
        <Text style={[styles.productPrice, { color: colors.primary }]}>€{product.currentPrice.toFixed(2)}</Text>
        <View style={styles.tagsContainer}>
          <Tag text={product.currentBrand} colors={colors} />
          {product.tags?.map((tag, index) => (
            <Tag key={index} text={tag} colors={colors} />
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const CategorySection = ({ category, onProductPress }: { category: Category; onProductPress: (product: Product) => void }) => {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);

  return (
    <View style={styles.categorySection}>
      <Text style={[styles.categoryTitle, { color: colors.text }]}>{category.name}</Text>
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
};

const HomeScreen = ({ navigation }: any) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const { user } = useAuth();
  const { theme } = useTheme();
  const colors = getThemeColors(theme);

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
    <Layout>
      <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={[styles.welcomeSection, { backgroundColor: colors.inputBackground }]}>
          <Text style={[styles.welcomeText, { color: colors.text }]}>
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
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcomeSection: {
    padding: spacing.md,
  },
  welcomeText: {
    ...typography.header,
    fontSize: 24,
  },
  categorySection: {
    marginVertical: spacing.md,
  },
  categoryTitle: {
    ...typography.header,
    marginLeft: spacing.md,
    marginBottom: spacing.sm,
  },
  productCard: {
    width: 320,
    borderRadius: 12,
    marginHorizontal: spacing.sm,
  },
  productContent: {
    flexDirection: 'row',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
  },
  productImage: {
    width: 128,
    height: 128,
  },
  vendorPrices: {
    flex: 1,
    padding: spacing.sm,
    backgroundColor: '#F5F5F5',
  },
  vendorPriceItem: {
    marginBottom: spacing.xs,
  },
  vendorPriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  vendorName: {
    ...typography.caption,
    flex: 1,
    marginRight: spacing.sm,
  },
  vendorPrice: {
    ...typography.body,
    fontWeight: '600',
  },
  productInfo: {
    padding: spacing.sm,
  },
  productName: {
    ...typography.title,
    marginBottom: spacing.xs,
  },
  productPrice: {
    ...typography.title,
    fontSize: 18,
    marginBottom: spacing.xs,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  tagContainer: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 4,
    borderWidth: 1,
  },
  tagText: {
    ...typography.caption,
  },
});

export default HomeScreen; 