import { View, Text } from "react-native";
import React, { useEffect } from "react";
import {
    Box,
    Button,
    Divider,
    Heading,
    HStack,
    Icon,
    ScrollView,
} from "native-base";
import BackButton from "../../util/BackButton";
import { Ionicons } from "react-native-vector-icons";
import { useNavigation } from "@react-navigation/native";
import { indexOf } from "lodash";
import { useDispatch, useSelector } from "react-redux";
const PostStep = ({ title, children, canContinue, final, noBack, done }) => {
    const postStep = useSelector((state) => state.post.postStep);
    const nav = useNavigation();
    const steps = ["Post Images", "Main Details", "Price", "Review", "Confirm"];
    const currI = indexOf(steps, title);
    const prevI = currI === 0 ? null : currI - 1;
    const nextI = currI === steps.length ? null : currI + 1;
    const dispatch = useDispatch();
    const isDone = done != null;

    const nextPage = () => {
        if (isDone) {
            dispatch({
                type: "SET",
                attr: "postCategory",
                payload: null,
            });
            dispatch({
                type: "SET",
                attr: "postDetails",
                payload: {},
            });
            nav.reset({
                index: 0,
                routes: [{ name: "Post Images" }],
            });
            nav.navigate("Explore");
        } else {
            nextI && nav.navigate(steps[[nextI]]);
        }
    };
    return (
        <Box flex={1} safeArea>
            <HStack
                alignItems={"center"}
                justifyContent={"space-between"}
                m={2}
            >
                <Box opacity={prevI != null && !noBack ? 1 : 0}>
                    <BackButton></BackButton>
                </Box>
                <Heading size={"md"}>{title}</Heading>
                <Box opacity={0}>
                    <BackButton></BackButton>
                </Box>
            </HStack>
            <Box flex={1} m={final ? 0 : 2} mt={final ? 0 : 4}>
                <ScrollView>{children}</ScrollView>
            </Box>
            <Button
                m={2}
                borderRadius={0}
                colorScheme={"muted"}
                bg={"black"}
                size={"lg"}
                _text={{ fontWeight: "bold" }}
                isDisabled={!canContinue}
                onPress={nextPage}
            >
                {isDone
                    ? "Return to Explore"
                    : final
                    ? "Post Listing"
                    : "Continue"}
            </Button>
        </Box>
    );
};

export default PostStep;
