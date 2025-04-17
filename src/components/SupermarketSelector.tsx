import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

interface Supermarket {
  id: string;
  name: string;
  logo: string;
}

interface SupermarketSelectorProps {
  supermarkets: Supermarket[];
  selectedSupermarket: string | null;
  onSelect: (id: string) => void;
}

const SupermarketSelector = ({
  supermarkets,
  selectedSupermarket,
  onSelect,
}: SupermarketSelectorProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Επιλέξτε supermarket</Text>
      <View style={styles.list}>
        {supermarkets.map((supermarket) => (
          <TouchableOpacity
            key={supermarket.id}
            style={[
              styles.supermarketItem,
              selectedSupermarket === supermarket.id && styles.selectedItem,
            ]}
            onPress={() => onSelect(supermarket.id)}
          >
            <Image
              source={{ uri: supermarket.logo }}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.supermarketName}>{supermarket.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  supermarketItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    backgroundColor: '#F8F8F8',
  },
  selectedItem: {
    borderColor: '#00B074',
    backgroundColor: '#E6F7F1',
  },
  logo: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  supermarketName: {
    fontSize: 14,
    color: '#333',
  },
});

export default SupermarketSelector; 