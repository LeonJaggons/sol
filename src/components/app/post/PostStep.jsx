import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { Box, Button, Heading, HStack, Icon } from "native-base";
import BackButton from "../../util/BackButton";
import { Ionicons } from "react-native-vector-icons";
import { useNavigation } from "@react-navigation/native";
import { indexOf } from "lodash";
import { useSelector } from "react-redux";
const PostStep = ({ title, children, canContinue }) => {
    const postStep = useSelector((state) => state.post.postStep);
    const nav = useNavigation();
    const steps = ["Post Images", "Main Details", "Price"];
    const currI = indexOf(steps, title);
    const prevI = currI === 0 ? null : currI - 1;
    const nextI = currI === steps.length ? null : currI + 1;

    const nextPage = () => {
        nextI && nav.navigate(steps[[nextI]]);
    };
    return (
        <Box flex={1} safeArea p={2}>
            <HStack alignItems={"center"} justifyContent={"space-between"}>
                <Box opacity={prevI != null ? 1 : 0}>
                    <BackButton></BackButton>
                </Box>
                <Heading size={"md"}>{title}</Heading>
                <Box opacity={0}>
                    <BackButton></BackButton>
                </Box>
            </HStack>
            <Box mt={4} flex={1}>
                {children}
            </Box>
            <Button
                borderRadius={0}
                colorScheme={"muted"}
                bg={"black"}
                size={"lg"}
                _text={{ fontWeight: "bold" }}
                isDisabled={!canContinue}
                onPress={nextPage}
            >
                Continue
            </Button>
        </Box>
    );
};

export default PostStep;
