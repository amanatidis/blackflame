import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import { Category, Product } from '../types';
import { getCategories } from '../services/mockData';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { getThemeColors, spacing, typography } from '../theme/theme';
import { Layout } from '../components/Layout';
import { ProductCard } from '../components/ProductCard';

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
});

export default HomeScreen; 