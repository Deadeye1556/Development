import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { supabase } from '../lib/supabase';
import { colors, typography, spacing, radius } from '../styles/theme';

export default function SettingsScreen({ navigation }) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState(null);
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const [signOutLoading, setSignOutLoading] = useState(false);
  const [signOutError, setSignOutError] = useState(null);

  async function handleChangePassword() {
    setPasswordError(null);
    setPasswordSuccess(false);

    if (newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match.');
      return;
    }

    setPasswordLoading(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) {
      setPasswordError(error.message);
    } else {
      setPasswordSuccess(true);
      setNewPassword('');
      setConfirmPassword('');
    }
    setPasswordLoading(false);
  }

  async function handleSignOut() {
    setSignOutError(null);
    setSignOutLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      setSignOutError(error.message);
      setSignOutLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.navBar}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={styles.navButton}
            accessibilityRole="button"
            accessibilityLabel="Back"
          >
            <Text style={styles.navButtonText}>← Back</Text>
          </Pressable>
          <Text style={styles.navTitle}>Settings</Text>
          <View style={styles.navButton} />
        </View>

        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Change Password</Text>

            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>New password</Text>
              <TextInput
                style={styles.input}
                value={newPassword}
                onChangeText={text => {
                  setNewPassword(text);
                  setPasswordError(null);
                  setPasswordSuccess(false);
                }}
                placeholder="Min 6 characters"
                placeholderTextColor={colors.textDisabled}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
                editable={!passwordLoading}
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Confirm new password</Text>
              <TextInput
                style={styles.input}
                value={confirmPassword}
                onChangeText={text => {
                  setConfirmPassword(text);
                  setPasswordError(null);
                  setPasswordSuccess(false);
                }}
                placeholder="Repeat your new password"
                placeholderTextColor={colors.textDisabled}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="done"
                onSubmitEditing={handleChangePassword}
                editable={!passwordLoading}
              />
            </View>

            {passwordError ? (
              <View style={styles.errorBox}>
                <Text style={styles.errorText}>{passwordError}</Text>
              </View>
            ) : null}

            {passwordSuccess ? (
              <View style={styles.successBox}>
                <Text style={styles.successText}>Password updated successfully.</Text>
              </View>
            ) : null}

            <Pressable
              style={[styles.primaryButton, passwordLoading && styles.buttonDisabled]}
              onPress={handleChangePassword}
              disabled={passwordLoading}
              accessibilityRole="button"
            >
              {passwordLoading ? (
                <ActivityIndicator color={colors.textInverse} />
              ) : (
                <Text style={styles.primaryButtonLabel}>Update password</Text>
              )}
            </Pressable>
          </View>

          <View style={styles.divider} />

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Account</Text>

            {signOutError ? (
              <View style={styles.errorBox}>
                <Text style={styles.errorText}>{signOutError}</Text>
              </View>
            ) : null}

            <Pressable
              style={[styles.destructiveButton, signOutLoading && styles.buttonDisabled]}
              onPress={handleSignOut}
              disabled={signOutLoading}
              accessibilityRole="button"
            >
              {signOutLoading ? (
                <ActivityIndicator color={colors.error} />
              ) : (
                <Text style={styles.destructiveButtonLabel}>Sign out</Text>
              )}
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.surface,
  },
  navButton: {
    minWidth: 64,
    paddingVertical: spacing.xs,
  },
  navButtonText: {
    ...typography.body,
    color: colors.primary,
  },
  navTitle: {
    ...typography.h3,
  },
  scroll: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  section: {
    gap: spacing.md,
  },
  sectionTitle: {
    ...typography.h3,
    marginBottom: spacing.xs,
  },
  fieldGroup: {
    gap: spacing.xs,
  },
  fieldLabel: {
    ...typography.bodySmall,
    fontWeight: '500',
    color: colors.text,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.surface,
  },
  errorBox: {
    backgroundColor: colors.errorLight,
    borderRadius: radius.sm,
    padding: spacing.md,
  },
  errorText: {
    ...typography.bodySmall,
    color: colors.error,
  },
  successBox: {
    backgroundColor: colors.successLight,
    borderRadius: radius.sm,
    padding: spacing.md,
  },
  successText: {
    ...typography.bodySmall,
    color: colors.success,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
  },
  primaryButtonLabel: {
    ...typography.buttonLabel,
    color: colors.textInverse,
  },
  destructiveButton: {
    borderWidth: 1.5,
    borderColor: colors.error,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
  },
  destructiveButtonLabel: {
    ...typography.buttonLabel,
    color: colors.error,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.xl,
  },
});
