import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { Category, Product } from '../types';
import { getCategories } from '../services/mockData';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { getThemeColors, spacing, typography } from '../theme/theme';
import { Layout } from '../components/Layout';
import { ProductCard } from '../components/ProductCard';
import { Search, X } from 'react-native-feather';

const SearchBar = ({ onSearch, value }: { onSearch: (query: string) => void; value: string }) => {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchWidth] = useState(new Animated.Value(40));
  const [opacity] = useState(new Animated.Value(0));

  const toggleSearch = () => {
    const toValue = isExpanded ? 40 : 300;
    const toOpacity = isExpanded ? 0 : 1;
    
    Animated.parallel([
      Animated.spring(searchWidth, {
        toValue,
        useNativeDriver: false,
        tension: 30,
        friction: 8,
      }),
      Animated.timing(opacity, {
        toValue: toOpacity,
        duration: 150,
        useNativeDriver: true,
      })
    ]).start();
    
    setIsExpanded(!isExpanded);
  };

  return (
    <View style={styles.searchWrapper}>
      <Animated.View style={[
        styles.searchContainer,
        { 
          backgroundColor: colors.inputBackground,
          width: searchWidth,
          shadowColor: colors.text,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }
      ]}>
        <Animated.View style={{ flex: 1, opacity }}>
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search for a product..."
            placeholderTextColor={colors.secondaryText}
            onChangeText={onSearch}
            value={value}
            autoFocus
          />
        </Animated.View>
        <TouchableOpacity 
          onPress={toggleSearch} 
          style={[styles.searchIcon, { backgroundColor: 'transparent' }]}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          {isExpanded ? (
            <X size={20} color={colors.text} />
          ) : (
            <Search size={20} color={colors.text} />
          )}
        </TouchableOpacity>
      </Animated.View>
    </View>
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
      <View style={[styles.separator, { backgroundColor: colors.border }]} />
    </View>
  );
};

const SearchResults = ({ products, onProductPress }: { products: Product[]; onProductPress: (product: Product) => void }) => {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);

  if (products.length === 0) {
    return (
      <View style={styles.noResultsContainer}>
        <Text style={[styles.noResultsText, { color: colors.secondaryText }]}>
          No products found matching your search
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.searchResultsContainer}>
      <Text style={[styles.searchResultsTitle, { color: colors.text }]}>
        Search Results
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {products.map((product) => (
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
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
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

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      setFilteredProducts([]);
      return;
    }

    const searchTerm = query.toLowerCase().trim();
    const allProducts = categories.flatMap(category => category.products);
    
    const filtered = allProducts.filter(product => 
      product.name.toLowerCase().includes(searchTerm)
    );

    setFilteredProducts(filtered);
  };

  return (
    <Layout>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={[styles.header, { backgroundColor: colors.background }]}>
          <View style={[styles.welcomeSection, { backgroundColor: colors.inputBackground }]}>
            <Text style={[styles.welcomeText, { color: colors.text }]}>
              Welcome{user?.name ? `, ${user.name}` : ''}!
            </Text>
          </View>
          <SearchBar onSearch={handleSearch} value={searchQuery} />
        </View>
        <ScrollView style={styles.scrollContent}>
          {searchQuery ? (
            <SearchResults products={filteredProducts} onProductPress={handleProductPress} />
          ) : (
            categories.map((category) => (
              <CategorySection
                key={category.id}
                category={category}
                onProductPress={handleProductPress}
              />
            ))
          )}
        </ScrollView>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    paddingTop: spacing.md,
  },
  scrollContent: {
    flex: 1,
    marginTop: 120, // Adjust this value based on your header height
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
  separator: {
    height: 1,
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
  },
  searchWrapper: {
    margin: spacing.md,
    marginTop: spacing.sm,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: spacing.sm,
    height: 44,
    overflow: 'hidden',
  },
  searchInput: {
    ...typography.body,
    flex: 1,
    marginRight: spacing.sm,
    fontSize: 16,
  },
  searchIcon: {
    padding: spacing.xs,
    borderRadius: 20,
  },
  searchResultsContainer: {
    marginVertical: spacing.md,
  },
  searchResultsTitle: {
    ...typography.header,
    marginLeft: spacing.md,
    marginBottom: spacing.sm,
  },
  noResultsContainer: {
    padding: spacing.lg,
    alignItems: 'center',
  },
  noResultsText: {
    ...typography.body,
    textAlign: 'center',
  },
});

export default HomeScreen; 