import { View, Text } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { Box, Heading, VStack } from "native-base";

const Inbox = () => {
    const firstMsgs = useSelector((state) => state.messages.latestMessages);
    return (
        <VStack>
            {Object.keys(firstMsgs).map((chainID) => (
                <InboxItem msg={firstMsgs[[chainID]]} />
            ))}
        </VStack>
    );
};

const InboxItem = ({ msg }) => {
    return (
        <Box>
            <Heading>Item</Heading>
        </Box>
    );
};

export default Inbox;
