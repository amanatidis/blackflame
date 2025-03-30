import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Text } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getThemeColors, spacing, typography } from '../theme/theme';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const { user, signIn, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigation = useNavigation();
  const colors = getThemeColors(theme);

  return (
    <View style={[styles.header, { backgroundColor: colors.headerBackground }]}>
      {navigation.canGoBack() && (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={colors.headerText} />
        </TouchableOpacity>
      )}
      <Text style={[styles.title, { color: colors.headerText }]}>{title}</Text>
      <View style={styles.rightButtons}>
        <TouchableOpacity
          onPress={toggleTheme}
          style={styles.themeButton}
        >
          <Ionicons
            name={theme === 'light' ? 'moon-outline' : 'sunny-outline'}
            size={24}
            color={colors.headerText}
          />
        </TouchableOpacity>
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
              color={colors.headerText}
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    height: 56,
  },
  title: {
    ...typography.header,
    flex: 1,
    textAlign: 'center',
  },
  rightButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authButton: {
    padding: spacing.sm,
  },
  themeButton: {
    padding: spacing.sm,
  },
  profilePicture: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  backButton: {
    padding: spacing.sm,
  },
});

export default Header; 