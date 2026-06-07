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

export default function UploadScreen({ navigation }) {
  const { session } = useAuth();

  if (!session) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <Text style={styles.emptyEmoji}>📤</Text>
          <Text style={styles.emptyTitle}>Share your recipes</Text>
          <Text style={styles.emptyBody}>
            Sign in to upload your own recipes and start building your creator
            profile.
          </Text>
          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate('Auth')}
            accessibilityRole="button"
          >
            <Text style={styles.buttonLabel}>Sign in to upload</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.center}>
        <Text style={styles.emptyEmoji}>📷</Text>
        <Text style={styles.emptyTitle}>Upload is coming in M2</Text>
        <Text style={styles.emptyBody}>
          Recipe creation, photo upload, and ingredient tagging will be
          available in the next milestone.
        </Text>
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
