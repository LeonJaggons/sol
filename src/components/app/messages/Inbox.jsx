import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
    Text,
    HStack,
    Heading,
    Image,
    Pressable,
    Spinner,
    VStack,
} from "native-base";
import { getItemData } from "../../../firebase/fire-store";
import { useNavigation } from "@react-navigation/native";

const Inbox = () => {
    const firstMsgs = useSelector((state) => state.messages.latestMessages);
    const allMessages = useSelector((state) => state.messages.allMessages);
    console.log("ALL MESSA", allMessages);
    return (
        <VStack>
            {Object.keys(firstMsgs).map((chainID) => (
                <InboxItem msg={firstMsgs[[chainID]]} />
            ))}
        </VStack>
    );
};

const InboxItem = ({ msg }) => {
    const nav = useNavigation();
    const [item, setItem] = useState();

    const loadItem = async () => {
        const newItem = await getItemData(msg.itemID);
        setItem({ ...newItem });
    };

    const handlePress = () => {
        nav.navigate("Message", {
            chainID: msg.chainID,
        });
    };
    useEffect(() => {
        loadItem();
    }, []);
    return !item ? (
        <HStack py={4} alignItems={"center"} justifyContent={"center"}>
            <Spinner />
        </HStack>
    ) : (
        <Pressable
            _pressed={{
                bg: "muted.200",
            }}
            onPress={handlePress}
        >
            <HStack p={2} space={3} alignItems={"center"}>
                <Image
                    alt={item.title}
                    borderRadius={5}
                    source={{ uri: item.imgs[0].uri }}
                    boxSize={"50px"}
                />
                <VStack justifyContent={"space-around"}>
                    <Heading size={"md"} fontWeight={700}>
                        {item.title}
                    </Heading>
                    <Text>{msg.content}</Text>
                </VStack>
            </HStack>
        </Pressable>
    );
};

export default Inbox;
