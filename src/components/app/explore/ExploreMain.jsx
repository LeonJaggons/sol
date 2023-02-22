import { View, Text } from "react-native";
import React from "react";
import { Box, HStack, Input } from "native-base";
import SolInput from "../../util/SolInput";

const ExploreMain = () => {
    return (
        <Box safeArea p={4}>
            <SolInput placeholder={"Search Sol items..."} size={"lg"} />
        </Box>
    );
};

export default ExploreMain;
