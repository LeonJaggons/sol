import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
    Box,
    Text,
    Center,
    HStack,
    Icon,
    IconButton,
    ScrollView,
    Spinner,
    VStack,
} from "native-base";
import SolInput from "../../util/SolInput";
import { Ionicons } from "react-native-vector-icons";
import { filter, orderBy, remove, sortBy } from "lodash";
import { sendMessage } from "../../../firebase/fire-store";
const MessageFocus = ({ route }) => {
    const [messages, setMessages] = useState();
    const { chainID } = route.params;
    const allMessages = useSelector((state) => state.messages.allMessages);
    useEffect(() => {
        setMessages(allMessages[[chainID]]);
    }, [chainID, allMessages]);
    return messages ? (
        <Box flex={1}>
            <MessagesPane messages={messages} />
        </Box>
    ) : (
        <Center flex={1}>
            <Spinner />
        </Center>
    );
};

const MessagesPane = ({ messages }) => {
    const [currMessages, setCurrMessages] = useState();
    const [content, setContent] = useState();
    const user = useSelector((state) => state.app.user);
    const exMsg = messages[0];
    const senderID = user.userID;
    const recipientID = filter(exMsg.participants, (o) => o !== senderID)[0];
    const chainID = exMsg.chainID;
    const itemID = exMsg.itemID;
    console.log("SENDER", senderID);
    console.log("RECIPIENT", recipientID);

    const loadSortedMessages = () => {
        const sorted = orderBy(
            messages,
            (o) => {
                return o.created.toDate();
            },
            ["asc"]
        );
        setCurrMessages([...sorted]);
    };

    useEffect(() => {
        loadSortedMessages();
    }, [messages]);
    const handleSend = async () => {
        await sendMessage(senderID, recipientID, chainID, itemID, content);
    };
    return !currMessages ? (
        <></>
    ) : (
        <VStack p={2} flex={1}>
            <Box>
                <ScrollView>
                    {currMessages.map((msg) => (
                        <Message msg={msg} key={msg.id} />
                    ))}
                </ScrollView>
            </Box>
            <Box flex={1}></Box>
            <HStack space={1}>
                <SolInput
                    flex={1}
                    borderRadius={"full"}
                    onChangeText={setContent}
                />
                <IconButton
                    borderRadius={"full"}
                    colorScheme={"muted"}
                    icon={
                        <Icon
                            as={Ionicons}
                            name={"send"}
                            color={"black"}
                            onPress={handleSend}
                        />
                    }
                />
            </HStack>
        </VStack>
    );
};
const Message = ({ msg }) => {
    const user = useSelector((state) => state.app.user);
    const isSent = msg.senderID === user.userID;
    console.log(isSent, "IS SENT");
    return (
        <HStack justifyContent={isSent ? "flex-end" : "flex-start"} mb={1}>
            <Box
                maxW={"75%"}
                borderRadius={10}
                p={3}
                py={2}
                bg={isSent ? "blue.500" : "muted.300"}
            >
                <Text color={isSent ? "white" : "black"}>{msg.content}</Text>
            </Box>
        </HStack>
    );
};

export default MessageFocus;
