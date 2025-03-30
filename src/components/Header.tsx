import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Text } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const { user, signIn, signOut } = useAuth();
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      {navigation.canGoBack() && (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity
        onPress={user ? signOut : signIn}
        style={[styles.authButton, { pointerEvents: 'auto' }]}
      >
        {user?.picture ? (
          <Image
            source={{ uri: user.picture }}
            style={styles.profilePicture}
          />
        ) : (
          <Ionicons
            name={user ? 'log-out-outline' : 'logo-google'}
            size={24}
            color="#fff"
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 56,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
    textAlign: 'center',
  },
  authButton: {
    padding: 8,
  },
  profilePicture: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  backButton: {
    padding: 8,
  },
});

export default Header; 