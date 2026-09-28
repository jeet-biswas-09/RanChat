import {
  doc,
  updateDoc,
  deleteDoc,
  arrayRemove,
  collection,
  getDocs,
  setDoc,
} from "firebase/firestore";

import { db } from "../services/firebase";

export async function addMember(
  classroomId: string,
  userId: string,
  userName: string,
  isOwner: boolean
) {
  await setDoc(doc(db, "classrooms", classroomId, "members", userId), {
    userName,
    joinedAt: Date.now(),
    isOwner,
  });
}

export async function leaveClassroom(classroomId: string, userId: string) {
  await updateDoc(doc(db, "classrooms", classroomId), {
    memberIds: arrayRemove(userId),
  });
  await deleteDoc(doc(db, "classrooms", classroomId, "members", userId));
}

export async function setScreenshotBlock(
  classroomId: string,
  blocked: boolean
) {
  await updateDoc(doc(db, "classrooms", classroomId), {
    screenshotsBlocked: blocked,
  });
}

export async function setMessagingDisabledUntil(
  classroomId: string,
  until: number | null
) {
  await updateDoc(doc(db, "classrooms", classroomId), {
    messagingDisabledUntil: until,
  });
}

export async function deleteClassroom(classroomId: string) {
  const messagesSnap = await getDocs(
    collection(db, "classrooms", classroomId, "messages")
  );
  await Promise.all(messagesSnap.docs.map((d) => deleteDoc(d.ref)));

  const membersSnap = await getDocs(
    collection(db, "classrooms", classroomId, "members")
  );
  await Promise.all(membersSnap.docs.map((d) => deleteDoc(d.ref)));

  await deleteDoc(doc(db, "classrooms", classroomId));
}