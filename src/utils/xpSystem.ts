import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore";

import { db } from "../services/firebase";

const ONE_DAY = 24 * 60 * 60 * 1000;

export type UserXPData = {
  xp: number;
  streakCount: number;
  lastClaimDate: number;
  referralCode: string;
  invitedCount: number;
  usedReferralCode: boolean;
  challengeXPClaimed: boolean;
};

function randomCode(length = 6): string {
  const chars = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < length; i++) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
}

export async function getOrCreateUserXP(userId: string): Promise<UserXPData> {
  const ref = doc(db, "users", userId);
  const snap = await getDoc(ref);

  if (snap.exists()) {
    return snap.data() as UserXPData;
  }

  const fresh: UserXPData = {
    xp: 0,
    streakCount: 0,
    lastClaimDate: 0,
    referralCode: randomCode(),
    invitedCount: 0,
    usedReferralCode: false,
    challengeXPClaimed: false,
  };
  await setDoc(ref, fresh);
  return fresh;
}

/**
 * Call whenever the XP screen is opened. Awards daily-streak XP at most
 * once per 24h window, and resets the streak if a day was missed.
 * Returns the updated data plus how much XP (if any) was just awarded.
 */
export async function claimDailyXPIfDue(
  userId: string
): Promise<{ data: UserXPData; awarded: number }> {
  const ref = doc(db, "users", userId);
  const current = await getOrCreateUserXP(userId);
  const now = Date.now();
  const diff = now - current.lastClaimDate;

  // Already claimed within the last 24h — nothing to do.
  if (current.lastClaimDate !== 0 && diff < ONE_DAY) {
    return { data: current, awarded: 0 };
  }

  const missedAWindow = current.lastClaimDate !== 0 && diff >= ONE_DAY * 2;
  const nextStreak = missedAWindow || current.lastClaimDate === 0
    ? 1
    : current.streakCount + 1;

  let reward = 60; // flat rate past day 7
  if (nextStreak <= 6) reward = 50;
  else if (nextStreak === 7) reward = 150;

  await updateDoc(ref, {
    xp: increment(reward),
    streakCount: nextStreak,
    lastClaimDate: now,
  });

  const updated: UserXPData = {
    ...current,
    xp: current.xp + reward,
    streakCount: nextStreak,
    lastClaimDate: now,
  };

  return { data: updated, awarded: reward };
}

export async function redeemReferralCode(
  userId: string,
  code: string
): Promise<{ success: boolean; message: string }> {
  const trimmed = code.trim().toUpperCase();
  if (!trimmed) return { success: false, message: "Enter a code first." };

  const myData = await getOrCreateUserXP(userId);
  if (myData.usedReferralCode) {
    return { success: false, message: "You've already used an invite code." };
  }
  if (trimmed === myData.referralCode) {
    return { success: false, message: "You can't use your own code." };
  }

  const q = query(
    collection(db, "users"),
    where("referralCode", "==", trimmed)
  );
  const snap = await getDocs(q);
  if (snap.empty) {
    return { success: false, message: "That code doesn't exist." };
  }

  const ownerDoc = snap.docs[0];
  const ownerData = ownerDoc.data() as UserXPData;

  // Credit both sides
  await updateDoc(doc(db, "users", userId), {
    xp: increment(100),
    usedReferralCode: true,
  });

  const newInvitedCount = (ownerData.invitedCount ?? 0) + 1;
  const shouldAwardChallenge =
    newInvitedCount >= 3 && !ownerData.challengeXPClaimed;

  await updateDoc(doc(db, "users", ownerDoc.id), {
    xp: increment(100 + (shouldAwardChallenge ? 300 : 0)),
    invitedCount: increment(1),
    ...(shouldAwardChallenge ? { challengeXPClaimed: true } : {}),
  });

  return { success: true, message: "Code redeemed! You both earned +100 XP." };
}

export async function redeemPremiumWithXP(
  userId: string,
  xpCost: number,
  tier: string
): Promise<{ success: boolean; message: string }> {
  const data = await getOrCreateUserXP(userId);
  if (data.xp < xpCost) {
    return {
      success: false,
      message: `You need ${xpCost - data.xp} more XP for this.`,
    };
  }

  await updateDoc(doc(db, "users", userId), {
    xp: increment(-xpCost),
    premiumTier: tier,
  });

  return { success: true, message: `Redeemed! You now have ${tier} Premium.` };
}