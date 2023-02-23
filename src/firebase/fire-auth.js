import { createUserWithEmailAndPassword } from "firebase/auth";
import {
    collection,
    doc,
    getDoc,
    setDoc,
    Timestamp,
    updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Fire from "./firebase-init";

export const createNewAccount = async (userInfo) => {
    const userCred = await createUserWithEmailAndPassword(
        Fire.auth,
        userInfo.email,
        userInfo.password
    );
    delete userInfo["password"];
    const userID = userCred.user.uid;
    const imgURL = await uploadProfileImg(userID, userInfo.image);
    userInfo = {
        ...userInfo,
        userID: userID,
        img: imgURL,
        likedItems: [],
        created: Timestamp.now(),
    };
    const userDocRef = doc(Fire.store, "users", userID);
    await setDoc(userDocRef, {
        ...userInfo,
    });
};

export const uploadProfileImg = async (userID, img) => {
    const uiRef = ref(Fire.storage, `users/${userID}/profilePic`);
    const imgRes = await fetch(img);
    const imgBlob = await imgRes.blob();
    const res = await uploadBytes(uiRef, imgBlob);
    const dlURL = await getDownloadURL(res.ref);
    return dlURL;
};
