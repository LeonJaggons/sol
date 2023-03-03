import {
    arrayRemove,
    arrayUnion,
    collection,
    doc,
    getDoc,
    getDocs,
    onSnapshot,
    query,
    setDoc,
    Timestamp,
    updateDoc,
    where,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { filter, orderBy, update } from "lodash";
import moment from "moment";
import { v4 } from "uuid";
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
        itemID: itemID,
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

export const getItemData = async (itemID) => {
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

export const getSavedListings = async () => {
    const userID = store.getState().app.user?.userID;
    const userDocRef = doc(collection(Fire.store, "users"), userID);
    const userDoc = await getDoc(userDocRef);
    const likes = userDoc.data().likedItems;

    if (!likes || likes.length === 0) return [];
    const likedQry = query(
        collection(Fire.store, "items"),
        where("itemID", "in", likes)
    );
    const likedItems = await getDocs(likedQry);
    const items = likedItems.docs.map((dc) => {
        return {
            ...dc.data(),
        };
    });
    return [...items];
};

export const addViewed = async (itemID) => {
    const userID = store.getState().app.user?.userID;
    const userDocRef = doc(collection(Fire.store, "users"), userID);
    const userDoc = await getDoc(userDocRef);
    const viewed = userDoc.data().recentlyViewed;

    if (!viewed || viewed.length === 0) {
        await updateDoc(userDocRef, {
            recentlyViewed: [itemID],
        });
    } else {
        let filtered = filter(viewed, (o) => o !== itemID);
        let newViewed = [itemID, ...filtered];
        await updateDoc(userDocRef, {
            recentlyViewed: newViewed,
        });
    }
};

export const getViewedListings = async () => {
    const userID = store.getState().app.user?.userID;
    const userDocRef = doc(collection(Fire.store, "users"), userID);
    const userDoc = await getDoc(userDocRef);
    const viewed = userDoc.data().recentlyViewed;

    if (!viewed || viewed.length === 0) return [];
    const viewedQry = query(
        collection(Fire.store, "items"),
        where("itemID", "in", viewed)
    );
    const viewedItems = await getDocs(viewedQry);
    const items = viewedItems.docs.map((dc) => {
        return {
            ...dc.data(),
        };
    });
    return [...items];
};

const createMessageID = () => {
    let id = "MSG-";
    for (let i = 0; i < 8; i++) {
        let curr = Math.floor(Math.random() * 10);
        id += curr;
    }
    return id;
};

export const sendMessage = async (
    senderID,
    recipientID,
    chainID,
    itemID,
    content
) => {
    const message = {
        chainID: chainID,
        content: content,
        recipientID: recipientID,
        senderID: senderID,
        participants: [senderID, recipientID],
        itemID: itemID,
        created: Timestamp.now(),
    };
    const msgID = createMessageID();
    const msgDocRef = doc(collection(Fire.store, "messages"), msgID);
    await setDoc(msgDocRef, {
        ...message,
    });
};
export const sendFirstMessage = async (item, content) => {
    // chain id = ITEM_ID + ITEM_SELLER_ID + ITEM_BUYER_ID
    const userID = store.getState().app.user?.userID;
    const itemID = item.itemID;
    const sellerID = item.userID;
    const buyerID = userID;

    const chainID = itemID + "&" + sellerID + "&" + buyerID;
    const msgID = createMessageID();
    const message = {
        chainID: chainID,
        content: content,
        recipientID: sellerID,
        senderID: userID,
        participants: [userID, sellerID],
        itemID: itemID,
        created: Timestamp.now(),
    };

    const msgDocRef = doc(collection(Fire.store, "messages"), msgID);
    await updateDoc(doc(Fire.store, "users", userID), {
        messageChains: arrayUnion(chainID),
    });
    await updateDoc(doc(Fire.store, "users", sellerID), {
        messageChains: arrayUnion(chainID),
    });
    await setDoc(msgDocRef, {
        ...message,
    });
};

export const subscribeUserMessages = () => {
    const userID = store.getState().app.user?.userID;

    const msgQry = query(
        collection(Fire.store, "messages"),
        where("participants", "array-contains", userID)
    );

    const unsub = onSnapshot(msgQry, (snap) => {
        const messages = {};
        const latestMessages = {};
        snap.docs.map((msgDoc) => {
            const msg = { id: msgDoc.id, ...msgDoc.data() };
            let currMessages = messages[[msg.chainID]];
            let latestMessage = latestMessages[[msg.chainID]];
            if (!currMessages) {
                currMessages = [msg];
            } else {
                currMessages.push(msg);
            }

            if (!latestMessage) {
                latestMessage = msg;
            } else {
                const prevMsgDate = moment(latestMessage.created.toDate());
                const currMsgDate = moment(msg.created.toDate());

                if (currMsgDate.isAfter(prevMsgDate, "second")) {
                    latestMessage = msg;
                }
            }
            latestMessages[[msg.chainID]] = latestMessage;
            messages[[msg.chainID]] = currMessages;
        });
        store.dispatch({
            type: "SET",
            attr: "allMessages",
            payload: { ...messages },
        });
        store.dispatch({
            type: "SET",
            attr: "latestMessages",
            payload: { ...latestMessages },
        });
    });
    return unsub;
};
