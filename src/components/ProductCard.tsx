import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Product } from '../types';
import { useTheme } from '../context/ThemeContext';
import { getThemeColors, spacing, typography } from '../theme/theme';

interface ProductCardProps {
  product: Product;
  onPress: (product: Product) => void;
}

const Tag = ({ text, colors }: { text: string; colors: any }) => (
  <View style={[styles.tagContainer, { backgroundColor: colors.tagBackground, borderColor: colors.tagBorder }]}>
    <Text style={[styles.tagText, { color: colors.tagText }]}>{text}</Text>
  </View>
);


const brandImages: { [key: string]: any } = {
  "ab": require('../assets/brands/ab.png'),
  "bazaar": require('../assets/brands/bazaar.png'),
  "e-fresh": require('../assets/brands/e-fresh.png'),
  "efood-market": require('../assets/brands/efood-market.png'),
  "kritikos": require('../assets/brands/kritikos.png'),
  "market-in": require('../assets/brands/market-in.png'),
  "masoutis": require('../assets/brands/masoutis.png'),
  "my-market": require('../assets/brands/my-market.png'),
  "sklavenitis": require('../assets/brands/sklavenitis.png'),
  "thanopoulos": require('../assets/brands/thanopoulos.png'),
  "wolt-market": require('../assets/brands/wolt-market.png'),
};

export function ProductCard({ product, onPress }: ProductCardProps) {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);

  return (
    <TouchableOpacity 
      style={[styles.card, { backgroundColor: colors.card }]} 
      onPress={() => onPress(product)}
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
                <Image source={brandImages[vendorProduct.vendor]} style={{ width: 24, height: 24, marginRight: spacing.xs }} />
                {/* <Text style={[styles.vendorName, { color: colors.text }]} numberOfLines={1}>{vendorProduct.vendor}</Text> */}
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
}

const styles = StyleSheet.create({
  card: {
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
    backgroundColor: 'transparent',
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
