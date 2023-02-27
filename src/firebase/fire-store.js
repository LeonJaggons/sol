import {
    arrayRemove,
    arrayUnion,
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    setDoc,
    Timestamp,
    updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { orderBy } from "lodash";
import store from "../redux/store";
import Fire from "./firebase-init";

const createItemID = () => {
    let id = "ITEM-";
    for (let i = 0; i < 8; i++) {
        let curr = Math.floor(Math.random() * 10);
        id += curr;
    }
    return id;
};

export const publishItem = async (userID, itemDetails) => {
    const images = itemDetails.imgs.map((img) => img.uri);
    delete itemDetails["imgs"];
    const itemID = createItemID();
    const docRef = doc(Fire.store, "items", itemID);
    await setDoc(docRef, {
        userID: userID,
        ...itemDetails,
        created: Timestamp.now(),
    });
    const imgs = await uploadItemImgs(userID, itemID, images);
    await updateDoc(docRef, { imgs: imgs });
};

export const uploadItemImgs = async (userID, itemID, imgs) => {
    const refRoot = `users/${userID}/items/${itemID}/imgs/`;
    let dlURLs = [];
    let i = 0;
    for (let img of imgs) {
        const imgRef = ref(Fire.storage, refRoot + `IMG-${i}`);
        const imgRes = await fetch(img);
        const imgBlob = await imgRes.blob();
        const res = await uploadBytes(imgRef, imgBlob);
        const dlURL = await getDownloadURL(res.ref);
        dlURLs.push(dlURL);
        i++;
    }
    return dlURLs;
};

export const getAllItems = async (includeUser = true) => {
    const userID = store.getState().app.user.userID;
    const itemsCol = includeUser
        ? query(collection(Fire.store, "items"), orderBy("created"))
        : query(
              collection(Fire.store, "items"),
              where("userID", "!=", userID),
              orderBy("created")
          );
    const itemDocs = await getDocs(itemsCol);
    const items = [
        ...itemDocs.docs.map((iDoc) => {
            return {
                itemID: iDoc.id,
                ...iDoc.data(),
            };
        }),
    ];
    return items;
};

export const getFocusItemData = async (itemID) => {
    const itemDocRef = doc(collection(Fire.store, "items"), itemID);
    const itemDoc = await getDoc(itemDocRef);
    const itemData = itemDoc.data();
    itemData["imgs"] = itemData["imgs"].map((img) => {
        return {
            uri: img,
        };
    });
    const item = { ...itemData, itemID: itemDoc.id };
    return item;
};

export const isItemLiked = async (itemID) => {
    const userID = store.getState().app.user?.userID;
    const userDocRef = doc(collection(Fire.store, "users"), userID);
    const userDoc = await getDoc(userDocRef);
    const likes = userDoc.data().likedItems;
    return likes != null && likes.includes(itemID);
};

export const toggleLiked = async (itemID) => {
    const isLiked = await isItemLiked(itemID);
    const userID = store.getState().app.user?.userID;
    const userDocRef = doc(collection(Fire.store, "users"), userID);
    await updateDoc(userDocRef, {
        likedItems: isLiked ? arrayRemove(itemID) : arrayUnion(itemID),
    });
};
