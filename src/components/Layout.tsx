import React from 'react';
import { View, ViewStyle, StyleSheet, SafeAreaView } from 'react-native';

interface LayoutProps {
  children: React.ReactNode;
  style?: ViewStyle;
  useSafeArea?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  style, 
  useSafeArea = true 
}) => {
  const Container = useSafeArea ? SafeAreaView : View;
  
  return (
    <Container style={[styles.container, style]}>
      {children}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
}); 