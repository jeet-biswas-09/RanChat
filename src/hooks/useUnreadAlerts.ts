import { useEffect, useRef, useState } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
  limit,
} from "firebase/firestore";

import { db } from "../services/firebase";
import { getAnonymousIdentity } from "../utils/anonymousIdentity";
import { getLastSeen } from "../utils/unreadTracking";

type LatestMessage = {
  text: string;
  senderId: string;
  senderName: string;
  createdAt: number;
};

export function useUnreadAlerts(): boolean {
  const [hasUnread, setHasUnread] = useState(false);
  const latestRef = useRef<Record<string, LatestMessage>>({});
  const myUserIdRef = useRef<string | null>(null);
  const msgUnsubs = useRef<Record<string, () => void>>({});

  useEffect(() => {
    let unsubClassrooms: (() => void) | undefined;
    let cancelled = false;

    const recompute = async () => {
      let unread = false;
      for (const [classroomId, msg] of Object.entries(latestRef.current)) {
        if (msg.senderId === myUserIdRef.current) continue;
        const lastSeen = await getLastSeen(classroomId);
        if (msg.createdAt > lastSeen) {
          unread = true;
          break;
        }
      }
      if (!cancelled) setHasUnread(unread);
    };

    getAnonymousIdentity().then(({ userId }) => {
      myUserIdRef.current = userId;

      const q = query(
        collection(db, "classrooms"),
        where("memberIds", "array-contains", userId)
      );

      unsubClassrooms = onSnapshot(q, (snapshot) => {
        const ids = snapshot.docs.map((d) => d.id);

        ids.forEach((id) => {
          if (msgUnsubs.current[id]) return;

          const mq = query(
            collection(db, "classrooms", id, "messages"),
            orderBy("createdAt", "desc"),
            limit(1)
          );

          msgUnsubs.current[id] = onSnapshot(mq, (msnap) => {
            if (!msnap.empty) {
              latestRef.current[id] = msnap.docs[0].data() as LatestMessage;
              recompute();
            }
          });
        });

        Object.keys(msgUnsubs.current).forEach((id) => {
          if (!ids.includes(id)) {
            msgUnsubs.current[id]();
            delete msgUnsubs.current[id];
            delete latestRef.current[id];
          }
        });

        recompute();
      });
    });

    return () => {
      cancelled = true;
      if (unsubClassrooms) unsubClassrooms();
      Object.values(msgUnsubs.current).forEach((fn) => fn());
      msgUnsubs.current = {};
    };
  }, []);

  return hasUnread;
}