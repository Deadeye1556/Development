import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { colors, typography, spacing, radius } from '../styles/theme';

export default function HomeScreen({ navigation }) {
  const { session } = useAuth();

  if (!session) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <Text style={styles.emptyEmoji}>🏠</Text>
          <Text style={styles.emptyTitle}>Your feed lives here</Text>
          <Text style={styles.emptyBody}>
            Sign in to see recipes from creators you follow.
          </Text>
          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate('Auth')}
            accessibilityRole="button"
          >
            <Text style={styles.buttonLabel}>Sign in</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.center}>
        <Text style={styles.emptyEmoji}>🍳</Text>
        <Text style={styles.emptyTitle}>Your feed is on its way</Text>
        <Text style={styles.emptyBody}>
          Follow creators from Discover to build your personalized feed. Recipe
          cards arrive in M2.
        </Text>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('Discover')}
          accessibilityRole="button"
        >
          <Text style={styles.buttonLabel}>Browse Discover</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    gap: spacing.md,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: spacing.sm,
  },
  emptyTitle: {
    ...typography.h3,
    textAlign: 'center',
  },
  emptyBody: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    marginTop: spacing.sm,
  },
  buttonLabel: {
    ...typography.buttonLabel,
    color: colors.textInverse,
  },
});
