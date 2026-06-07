import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors, typography, spacing, radius, shadow } from '../styles/theme';

const INTERESTS = [
  { key: 'cooking', label: 'Cooking & Recipes', emoji: '🍳' },
  { key: 'brewing', label: 'Brewing & Ferments', emoji: '🍺' },
  { key: 'health', label: 'Health & Nutrition', emoji: '🥗' },
];

export default function OnboardingScreen({ navigation }) {
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleContinue() {
    if (!selected) return;
    setLoading(true);
    setError(null);
    try {
      await AsyncStorage.multiSet([
        ['hasSeenOnboarding', 'true'],
        ['userInterest', selected],
      ]);
      navigation.replace('Main');
    } catch {
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>What brings you to Forkd?</Text>
          <Text style={styles.subtitle}>
            Choose your primary interest to personalize your feed.
          </Text>
        </View>

        <View style={styles.tiles}>
          {INTERESTS.map(item => (
            <Pressable
              key={item.key}
              style={[styles.tile, selected === item.key && styles.tileSelected]}
              onPress={() => setSelected(item.key)}
              accessibilityRole="radio"
              accessibilityState={{ checked: selected === item.key }}
            >
              <Text style={styles.tileEmoji}>{item.emoji}</Text>
              <Text style={[styles.tileLabel, selected === item.key && styles.tileLabelSelected]}>
                {item.label}
              </Text>
            </Pressable>
          ))}
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Pressable
          style={[styles.button, (!selected || loading) && styles.buttonDisabled]}
          onPress={handleContinue}
          disabled={!selected || loading}
          accessibilityRole="button"
        >
          {loading ? (
            <ActivityIndicator color={colors.textInverse} />
          ) : (
            <Text style={styles.buttonLabel}>Get Started</Text>
          )}
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
  container: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.xl,
    justifyContent: 'space-between',
  },
  header: {
    gap: spacing.sm,
  },
  title: {
    ...typography.h1,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  tiles: {
    gap: spacing.md,
  },
  tile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 2,
    borderColor: colors.border,
    ...shadow.sm,
  },
  tileSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.surface,
  },
  tileEmoji: {
    fontSize: 32,
  },
  tileLabel: {
    ...typography.h3,
    color: colors.text,
  },
  tileLabelSelected: {
    color: colors.primary,
  },
  error: {
    ...typography.bodySmall,
    color: colors.error,
    textAlign: 'center',
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
  },
  buttonDisabled: {
    backgroundColor: colors.textDisabled,
  },
  buttonLabel: {
    ...typography.buttonLabel,
    color: colors.textInverse,
  },
});
