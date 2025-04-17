import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Modal } from 'react-native';
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
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleProfilePress = () => {
    if (user) {
      setIsDropdownVisible(true);
    } else {
      signIn();
    }
  };

  const handleOptionPress = (action: () => void) => {
    setIsDropdownVisible(false);
    action();
  };

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
          onPress={handleProfilePress}
          style={[styles.authButton, { pointerEvents: 'auto' }]}
        >
          {user?.photoURL ? (
            <Image
              source={{ uri: user.photoURL }}
              style={styles.profilePicture}
            />
          ) : (
            <Ionicons
              name={user ? 'person-circle-outline' : 'logo-google'}
              size={24}
              color={colors.headerText}
            />
          )}
        </TouchableOpacity>
      </View>

      <Modal
        visible={isDropdownVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsDropdownVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsDropdownVisible(false)}
        >
          <View style={[styles.dropdownMenu, { backgroundColor: colors.card }]}>
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => handleOptionPress(() => {})}
            >
              <Ionicons name="person-outline" size={20} color={colors.text} />
              <Text style={[styles.dropdownText, { color: colors.text }]}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => handleOptionPress(toggleTheme)}
            >
              <Ionicons
                name={theme === 'light' ? 'moon-outline' : 'sunny-outline'}
                size={20}
                color={colors.text}
              />
              <Text style={[styles.dropdownText, { color: colors.text }]}>
                {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => handleOptionPress(signOut)}
            >
              <Ionicons name="log-out-outline" size={20} color={colors.text} />
              <Text style={[styles.dropdownText, { color: colors.text }]}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
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
  profilePicture: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  backButton: {
    padding: spacing.sm,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    paddingTop: 56,
  },
  dropdownMenu: {
    position: 'absolute',
    top: 0,
    right: spacing.md,
    borderRadius: 8,
    padding: spacing.sm,
    minWidth: 200,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.sm,
    borderRadius: 4,
  },
  dropdownText: {
    marginLeft: spacing.sm,
    ...typography.body,
  },
});

export default Header; 