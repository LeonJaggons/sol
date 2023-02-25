import { doc, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import store from "../redux/store";
import { Fire } from "./firebase-init";

const createItemID = () => {
    let id = "ITEM-";
    for (let i = 0; i < 8; i++) {
        let curr = Math.floor(Math.random() * 10);
        id += curr;
    }
    return id;
};

export const publishItem = async (userID, itemDetails, images) => {
    const location = store.getState().app.userLocation;
    const itemID = createItemID();
    const docRef = doc(Fire.store, "items", itemID);
    await setDoc(docRef, {
        userID: userID,
        ...itemDetails,
        created: Timestamp.now(),
        location: location,
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
