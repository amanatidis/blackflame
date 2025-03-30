import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Product } from '../types';
import { useTheme } from '../context/ThemeContext';
import { getThemeColors, spacing, typography } from '../theme/theme';

const { width } = Dimensions.get('window');

const ProductDetailScreen = ({ route }: any) => {
  const { product }: { product: Product } = route.params;
  const { theme } = useTheme();
  const colors = getThemeColors(theme);

  const chartData = {
    labels: product.priceHistory.map((_, index) => 
      new Date(product.priceHistory[index].timestamp).toLocaleDateString()
    ),
    datasets: [
      {
        data: product.priceHistory.map(ph => ph.price),
        color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <Image source={{ uri: product.imageUrl }} style={styles.image} />
      
      <View style={styles.content}>
        <Text style={[styles.name, { color: colors.text }]}>{product.name}</Text>
        <Text style={[styles.brand, { color: colors.secondaryText }]}>{product.currentBrand}</Text>
        <Text style={[styles.price, { color: colors.primary }]}>€{product.currentPrice.toFixed(2)}</Text>
        
        <Text style={[styles.description, { color: colors.text }]}>{product.description}</Text>
        
        <View style={[styles.chartContainer, { backgroundColor: colors.card }]}>
          <Text style={[styles.chartTitle, { color: colors.text }]}>Price History</Text>
          <LineChart
            data={chartData}
            width={width - 32}
            height={220}
            chartConfig={{
              backgroundColor: colors.card,
              backgroundGradientFrom: colors.card,
              backgroundGradientTo: colors.card,
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            bezier
            style={styles.chart}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: 128,
    height: 128,
    alignSelf: 'center',
  },
  content: {
    padding: spacing.md,
  },
  name: {
    ...typography.header,
    fontSize: 24,
    marginBottom: spacing.sm,
  },
  brand: {
    ...typography.body,
    marginBottom: spacing.sm,
  },
  price: {
    ...typography.header,
    fontSize: 28,
    marginBottom: spacing.md,
  },
  description: {
    ...typography.body,
    lineHeight: 24,
    marginBottom: spacing.lg,
  },
  chartContainer: {
    borderRadius: 12,
    padding: spacing.md,
    ...(Platform.OS === 'web' ? {
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    } : {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    }),
  },
  chartTitle: {
    ...typography.title,
    marginBottom: spacing.md,
  },
  chart: {
    marginVertical: spacing.sm,
    borderRadius: 16,
  },
});

export default ProductDetailScreen; 