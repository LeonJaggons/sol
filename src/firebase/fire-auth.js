import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import {
    collection,
    doc,
    getDoc,
    setDoc,
    Timestamp,
    updateDoc,
} from "firebase/firestore";
import store from "../redux/store.js";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Fire from "./firebase-init";

export const createNewAccount = async (userInfo) => {
    const userCred = await createUserWithEmailAndPassword(
        Fire.auth,
        userInfo.email,
        userInfo.password
    );
    delete userInfo["password"];
    delete userInfo["confirmPassword"];
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
    store.dispatch({
        type: "SET",
        attr: "user",
        payload: { ...userInfo },
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

export const attemptSignIn = async (userInfo) => {
    console.log(userInfo);
    const res = await signInWithEmailAndPassword(
        Fire.auth,
        userInfo.email.toLowerCase(),
        userInfo.password
    );
    if (res.user) {
        const userID = res.user.uid;
        const userData = await getUserData(userID);
        store.dispatch({
            type: "SET",
            attr: "user",
            payload: { ...userData },
        });
    }
};

export const getUserData = async (userID) => {
    const userDoc = doc(Fire.store, "users", userID);
    const userData = (await getDoc(userDoc)).data();
    return { ...userData, created: userData.created.toDate() };
};
