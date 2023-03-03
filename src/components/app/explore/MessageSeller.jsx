import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import {
    Box,
    Heading,
    HStack,
    Icon,
    Image,
    Input,
    VStack,
    Button,
} from "native-base";
import { getUserData } from "../../../firebase/fire-auth";
import { Ionicons } from "react-native-vector-icons";
import SolInput, { SolTextArea } from "../../util/SolInput";
import { sendFirstMessage } from "../../../firebase/fire-store";
const MessageSeller = () => {
    const route = useRoute();
    const nav = useNavigation();
    const [sending, setSending] = useState(false);
    const [content, setContent] = useState("");
    const [canSend, setCanSend] = useState(false);
    const [seller, setSeller] = useState();

    const { sellerID, title, img, item } = route.params;
    console.log(item);
    const loadSeller = async () => {
        const sellerData = await getUserData(sellerID);
        setSeller({ ...sellerData });
    };

    useEffect(() => {
        loadSeller();
    }, []);
    useEffect(() => {
        setCanSend(content && content.trim() !== "");
    }, [content]);

    const handleSend = async () => {
        setSending(true);
        await sendFirstMessage(item, content);
        setSending(false);
        nav.goBack();
    };
    return seller ? (
        <Box flex={1} p={2} bg={"muted.50"}>
            <VStack space={4} flex={1}>
                <HStack justifyContent={"space-between"}>
                    <HStack space={3}>
                        <Image
                            alt={"Seller image"}
                            source={{ uri: seller.img }}
                            size={"sm"}
                            borderRadius={5}
                        />

                        <VStack>
                            <Heading size={"sm"}>
                                {seller.firstName} {seller.lastName[0]}.
                            </Heading>
                        </VStack>
                    </HStack>
                    <Image
                        alt={"Title"}
                        source={{ uri: img.uri }}
                        size={"sm"}
                        borderRadius={5}
                    />
                </HStack>
                <VStack space={1}>
                    <Heading size={"sm"} fontWeight={500}>
                        Send message
                    </Heading>
                    <SolTextArea
                        onChangeText={setContent}
                        value={content}
                        placeholder={`Hi ${seller.firstName}, is this still available?`}
                    />
                </VStack>
                <Box flex={1} />
                <Button
                    borderRadius={0}
                    colorScheme={"muted"}
                    bg={"black"}
                    _text={{ fontWeight: "bold" }}
                    // isDisabled={item.userID === user.userID}
                    isDisabled={!canSend}
                    isLoading={sending}
                    rightIcon={<Icon ml={2} as={Ionicons} name={"send"} />}
                    onPress={handleSend}
                >
                    Message Seller
                </Button>
            </VStack>
        </Box>
    ) : (
        <></>
    );
};

export default MessageSeller;
