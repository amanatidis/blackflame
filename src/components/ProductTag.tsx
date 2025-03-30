import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ProductTagProps {
  text: string;
  color?: string;
}

const ProductTag: React.FC<ProductTagProps> = ({ text, color = '#2196F3' }) => {
  return (
    <View style={[styles.tag, { backgroundColor: color }]}>
      <Text style={styles.tagText}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default ProductTag; 