import { supabase } from '../lib/supabase';

export async function fetchProfile(userId) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    if (error) throw error;
    return { profile: data, error: null };
  } catch (error) {
    return { profile: null, error: error.message };
  }
}

export async function updateProfile(userId, { display_name, avatar_url, bio }) {
  try {
    const { error } = await supabase
      .from('profiles')
      .update({ display_name, avatar_url, bio })
      .eq('id', userId);
    if (error) throw error;
    return { success: true, error: null };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function followUser(followerId, followingId) {
  try {
    const { error } = await supabase
      .from('follows')
      .insert({ follower_id: followerId, following_id: followingId });
    if (error) throw error;
    return { success: true, error: null };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function unfollowUser(followerId, followingId) {
  try {
    const { error } = await supabase
      .from('follows')
      .delete()
      .eq('follower_id', followerId)
      .eq('following_id', followingId);
    if (error) throw error;
    return { success: true, error: null };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function checkIfFollowing(followerId, followingId) {
  try {
    const { data, error } = await supabase
      .from('follows')
      .select('follower_id')
      .eq('follower_id', followerId)
      .eq('following_id', followingId)
      .maybeSingle();
    if (error) throw error;
    return { isFollowing: data !== null, error: null };
  } catch (error) {
    return { isFollowing: false, error: error.message };
  }
}

export async function fetchFollowers(userId) {
  try {
    const { data, error } = await supabase
      .from('follows')
      .select('follower:follower_id(*)')
      .eq('following_id', userId);
    if (error) throw error;
    return { followers: data.map(row => row.follower), error: null };
  } catch (error) {
    return { followers: [], error: error.message };
  }
}

export async function fetchFollowing(userId) {
  try {
    const { data, error } = await supabase
      .from('follows')
      .select('following:following_id(*)')
      .eq('follower_id', userId);
    if (error) throw error;
    return { following: data.map(row => row.following), error: null };
  } catch (error) {
    return { following: [], error: error.message };
  }
}
