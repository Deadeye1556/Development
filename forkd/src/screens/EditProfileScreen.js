import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { fetchProfile, updateProfile } from '../services/profiles';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { colors, typography, spacing, radius } from '../styles/theme';

async function uploadAvatar(userId, uri) {
  const ext = uri.split('.').pop()?.toLowerCase() ?? 'jpg';
  const path = `${userId}/avatar.${ext}`;
  const contentType = ext === 'png' ? 'image/png' : 'image/jpeg';

  const response = await fetch(uri);
  const blob = await response.blob();

  const { error } = await supabase.storage
    .from('avatars')
    .upload(path, blob, { upsert: true, contentType });

  if (error) throw new Error(error.message);

  const { data } = supabase.storage.from('avatars').getPublicUrl(path);
  return data.publicUrl;
}

export default function EditProfileScreen({ navigation }) {
  const { user } = useAuth();

  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [currentAvatarUrl, setCurrentAvatarUrl] = useState(null);
  const [localAvatarUri, setLocalAvatarUri] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProfile(user.id).then(({ profile, error: fetchError }) => {
      if (fetchError) {
        setError(fetchError);
      } else if (profile) {
        setDisplayName(profile.display_name ?? '');
        setBio(profile.bio ?? '');
        setCurrentAvatarUrl(profile.avatar_url ?? null);
      }
      setLoading(false);
    });
  }, [user.id]);

  async function handlePickAvatar() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      setError('Photo library access is required to change your avatar.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (result.canceled) return;
    setLocalAvatarUri(result.assets[0].uri);
  }

  async function handleSave() {
    if (!displayName.trim()) {
      setError('Display name is required.');
      return;
    }

    setSaving(true);
    setError(null);

    try {
      let avatarUrl = currentAvatarUrl;

      if (localAvatarUri) {
        avatarUrl = await uploadAvatar(user.id, localAvatarUri);
      }

      const { error: updateError } = await updateProfile(user.id, {
        display_name: displayName.trim(),
        bio: bio.trim(),
        avatar_url: avatarUrl,
      });

      if (updateError) throw new Error(updateError);

      navigation.goBack();
    } catch (err) {
      setError(err.message ?? 'Failed to save profile. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  const avatarSource = localAvatarUri ?? currentAvatarUrl;
  const initials = (displayName || '?').slice(0, 2).toUpperCase();

  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  if (error && !displayName) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <Text style={styles.emptyEmoji}>⚠️</Text>
          <Text style={styles.emptyTitle}>Could not load profile</Text>
          <Text style={styles.emptyBody}>{error}</Text>
          <Pressable
            style={styles.primaryButton}
            onPress={() => navigation.goBack()}
            accessibilityRole="button"
          >
            <Text style={styles.primaryButtonLabel}>Go back</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
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
            accessibilityLabel="Cancel"
          >
            <Text style={styles.navButtonText}>Cancel</Text>
          </Pressable>
          <Text style={styles.navTitle}>Edit Profile</Text>
          <Pressable
            onPress={handleSave}
            style={styles.navButton}
            disabled={saving}
            accessibilityRole="button"
            accessibilityLabel="Save"
          >
            {saving ? (
              <ActivityIndicator size="small" color={colors.primary} />
            ) : (
              <Text style={[styles.navButtonText, styles.navButtonSave]}>Save</Text>
            )}
          </Pressable>
        </View>

        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Pressable
            style={styles.avatarSection}
            onPress={handlePickAvatar}
            accessibilityRole="button"
            accessibilityLabel="Change avatar photo"
          >
            {avatarSource ? (
              <Image source={{ uri: avatarSource }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarInitials}>{initials}</Text>
              </View>
            )}
            <Text style={styles.changePhotoLabel}>Change photo</Text>
          </Pressable>

          {error ? (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Display name</Text>
            <TextInput
              style={styles.input}
              value={displayName}
              onChangeText={setDisplayName}
              placeholder="Your name"
              placeholderTextColor={colors.textDisabled}
              autoCapitalize="words"
              autoCorrect={false}
              returnKeyType="next"
              editable={!saving}
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Bio</Text>
            <TextInput
              style={[styles.input, styles.inputMultiline]}
              value={bio}
              onChangeText={setBio}
              placeholder="Tell people about yourself"
              placeholderTextColor={colors.textDisabled}
              multiline
              numberOfLines={3}
              maxLength={200}
              returnKeyType="done"
              editable={!saving}
            />
            <Text style={styles.charCount}>{bio.length}/200</Text>
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
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    marginTop: spacing.sm,
  },
  primaryButtonLabel: {
    ...typography.buttonLabel,
    color: colors.textInverse,
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
    alignItems: 'center',
    paddingVertical: spacing.xs,
  },
  navButtonText: {
    ...typography.body,
    color: colors.textSecondary,
  },
  navButtonSave: {
    color: colors.primary,
    fontWeight: '600',
  },
  navTitle: {
    ...typography.h3,
  },
  scroll: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  avatarSection: {
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: colors.border,
  },
  avatarPlaceholder: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInitials: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.textInverse,
  },
  changePhotoLabel: {
    ...typography.bodySmall,
    color: colors.primary,
    fontWeight: '600',
  },
  errorBox: {
    backgroundColor: colors.errorLight,
    borderRadius: radius.sm,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  errorText: {
    ...typography.bodySmall,
    color: colors.error,
  },
  fieldGroup: {
    gap: spacing.xs,
    marginBottom: spacing.lg,
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
  inputMultiline: {
    minHeight: 88,
    textAlignVertical: 'top',
    paddingTop: spacing.sm + 2,
  },
  charCount: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'right',
  },
});
