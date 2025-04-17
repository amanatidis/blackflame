import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProductListingScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>MoneyHunt</Text>
        <View style={styles.searchBar}>
          {/* Search implementation will go here */}
        </View>
        <View style={styles.userIcons}>
          {/* User icons will go here */}
        </View>
      </View>

      <View style={styles.content}>
        {/* Categories Sidebar */}
        <View style={styles.sidebar}>
          <Text style={styles.sidebarTitle}>Κατηγορίες</Text>
          {/* Category list will go here */}
        </View>

        {/* Main Product Grid */}
        <ScrollView style={styles.productGrid}>
          <Text style={styles.gridTitle}>Δημοφιλή προϊόντα</Text>
          <View style={styles.productsContainer}>
            {/* Product cards will go here */}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  logo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00B074',
  },
  searchBar: {
    flex: 1,
    marginHorizontal: 16,
  },
  userIcons: {
    flexDirection: 'row',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: 200,
    borderRightWidth: 1,
    borderRightColor: '#E5E5E5',
    padding: 16,
  },
  sidebarTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  productGrid: {
    flex: 1,
  },
  gridTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 16,
  },
  productsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
  },
});

export default ProductListingScreen; 