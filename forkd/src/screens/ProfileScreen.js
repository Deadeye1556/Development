import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Image,
  RefreshControl,
} from 'react-native';
import {
  fetchProfile,
  fetchFollowers,
  fetchFollowing,
  followUser,
  unfollowUser,
  checkIfFollowing,
} from '../services/profiles';
import { useAuth } from '../context/AuthContext';
import { colors, typography, spacing, radius } from '../styles/theme';

function Avatar({ uri, displayName, size = 80 }) {
  const initials = (displayName ?? '?').slice(0, 2).toUpperCase();
  if (uri) {
    return (
      <Image
        source={{ uri }}
        style={[styles.avatar, { width: size, height: size, borderRadius: size / 2 }]}
        accessibilityLabel={`${displayName} avatar`}
      />
    );
  }
  return (
    <View
      style={[
        styles.avatarPlaceholder,
        { width: size, height: size, borderRadius: size / 2 },
      ]}
    >
      <Text style={[styles.avatarInitials, { fontSize: size * 0.3 }]}>{initials}</Text>
    </View>
  );
}

function StatBlock({ count, label }) {
  return (
    <View style={styles.statBlock}>
      <Text style={styles.statCount}>{count}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

export default function ProfileScreen({ navigation, route }) {
  const { session, user } = useAuth();
  const targetUserId = route.params?.userId ?? user?.id;
  const isOwnProfile = !route.params?.userId || route.params.userId === user?.id;

  const [profile, setProfile] = useState(null);
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [followLoading, setFollowLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => {
    if (!targetUserId) {
      setLoading(false);
      return;
    }
    setError(null);
    const [profileResult, followersResult, followingResult] = await Promise.all([
      fetchProfile(targetUserId),
      fetchFollowers(targetUserId),
      fetchFollowing(targetUserId),
    ]);

    if (profileResult.error) {
      setError(profileResult.error);
      setLoading(false);
      setRefreshing(false);
      return;
    }

    setProfile(profileResult.profile);
    setFollowerCount(followersResult.followers.length);
    setFollowingCount(followingResult.following.length);

    if (!isOwnProfile && user?.id) {
      const { isFollowing: following } = await checkIfFollowing(user.id, targetUserId);
      setIsFollowing(following);
    }

    setLoading(false);
    setRefreshing(false);
  }, [targetUserId, isOwnProfile, user?.id]);

  useEffect(() => {
    setLoading(true);
    load();
  }, [load]);

  async function handleFollowToggle() {
    if (!session) {
      navigation.navigate('Auth');
      return;
    }
    setFollowLoading(true);
    const fn = isFollowing ? unfollowUser : followUser;
    const { error: toggleError } = await fn(user.id, targetUserId);
    if (!toggleError) {
      setIsFollowing(prev => !prev);
      setFollowerCount(prev => prev + (isFollowing ? -1 : 1));
    }
    setFollowLoading(false);
  }

  if (!session && isOwnProfile) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <Text style={styles.emptyEmoji}>👤</Text>
          <Text style={styles.emptyTitle}>Your profile lives here</Text>
          <Text style={styles.emptyBody}>
            Sign in to see your profile, followers, and saved recipes.
          </Text>
          <Pressable
            style={styles.primaryButton}
            onPress={() => navigation.navigate('Auth')}
            accessibilityRole="button"
          >
            <Text style={styles.primaryButtonLabel}>Sign in</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <Text style={styles.emptyEmoji}>⚠️</Text>
          <Text style={styles.emptyTitle}>Could not load profile</Text>
          <Text style={styles.emptyBody}>{error}</Text>
          <Pressable
            style={styles.primaryButton}
            onPress={() => { setLoading(true); load(); }}
            accessibilityRole="button"
          >
            <Text style={styles.primaryButtonLabel}>Try again</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  if (!profile) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <Text style={styles.emptyEmoji}>🤷</Text>
          <Text style={styles.emptyTitle}>Profile not found</Text>
          <Text style={styles.emptyBody}>
            This profile may have been removed or does not exist.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => { setRefreshing(true); load(); }}
            tintColor={colors.primary}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        {isOwnProfile && (
          <View style={styles.topActions}>
            <Pressable
              onPress={() => navigation.navigate('Settings')}
              accessibilityRole="button"
              accessibilityLabel="Settings"
              style={styles.iconButton}
            >
              <Text style={styles.iconButtonText}>⚙️</Text>
            </Pressable>
          </View>
        )}

        <View style={styles.profileCard}>
          <Avatar
            uri={profile.avatar_url}
            displayName={profile.display_name}
            size={88}
          />
          <Text style={styles.displayName}>{profile.display_name ?? 'Forkd User'}</Text>
          {profile.bio ? <Text style={styles.bio}>{profile.bio}</Text> : null}

          <View style={styles.statsRow}>
            <StatBlock count={followerCount} label="Followers" />
            <View style={styles.statDivider} />
            <StatBlock count={followingCount} label="Following" />
          </View>

          {isOwnProfile ? (
            <Pressable
              style={styles.editButton}
              onPress={() => navigation.navigate('EditProfile')}
              accessibilityRole="button"
            >
              <Text style={styles.editButtonLabel}>Edit Profile</Text>
            </Pressable>
          ) : (
            <Pressable
              style={[styles.followButton, isFollowing && styles.followButtonActive]}
              onPress={handleFollowToggle}
              disabled={followLoading}
              accessibilityRole="button"
            >
              {followLoading ? (
                <ActivityIndicator
                  color={isFollowing ? colors.primary : colors.textInverse}
                  size="small"
                />
              ) : (
                <Text
                  style={[
                    styles.followButtonLabel,
                    isFollowing && styles.followButtonLabelActive,
                  ]}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </Text>
              )}
            </Pressable>
          )}
        </View>

        <View style={styles.recipesSection}>
          <Text style={styles.sectionTitle}>Recipes</Text>
          <View style={styles.recipesEmpty}>
            <Text style={styles.emptyBody}>
              Recipes uploaded by this creator will appear here in M2.
            </Text>
          </View>
        </View>
      </ScrollView>
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
  topActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  iconButton: {
    padding: spacing.sm,
  },
  iconButtonText: {
    fontSize: 22,
  },
  profileCard: {
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
    gap: spacing.sm,
  },
  avatar: {
    backgroundColor: colors.border,
  },
  avatarPlaceholder: {
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInitials: {
    color: colors.textInverse,
    fontWeight: '700',
  },
  displayName: {
    ...typography.h2,
    marginTop: spacing.sm,
  },
  bio: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: spacing.lg,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xl,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  statBlock: {
    alignItems: 'center',
    gap: 2,
  },
  statCount: {
    ...typography.h3,
    color: colors.text,
  },
  statLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: colors.border,
  },
  editButton: {
    borderWidth: 1.5,
    borderColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xl,
    marginTop: spacing.sm,
  },
  editButtonLabel: {
    ...typography.buttonLabelSmall,
    color: colors.primary,
  },
  followButton: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xl,
    minWidth: 120,
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  followButtonActive: {
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  followButtonLabel: {
    ...typography.buttonLabelSmall,
    color: colors.textInverse,
  },
  followButtonLabelActive: {
    color: colors.primary,
  },
  recipesSection: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  sectionTitle: {
    ...typography.h3,
    marginBottom: spacing.md,
  },
  recipesEmpty: {
    padding: spacing.xl,
    alignItems: 'center',
  },
});
