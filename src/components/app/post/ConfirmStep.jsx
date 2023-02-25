import React, { useEffect, useState } from "react";
import PostStep from "./PostStep";
import {
    Text,
    Box,
    Center,
    Heading,
    Spinner,
    VStack,
    Icon,
    HStack,
    Button,
} from "native-base";
import { Ionicons } from "react-native-vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { publishItem } from "../../../firebase/fire-store";
import { useIsFocused } from "@react-navigation/native";
const ConfirmStep = ({ navigation }) => {
    const focused = useIsFocused();
    const dispatch = useDispatch();

    const handleClearPost = () => {
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
        navigation.reset({
            index: 0,
            routes: [{ name: "Post Images" }],
        });
    };
    useEffect(() => {
        if (!focused) handleClearPost();
    }, [focused]);
    return (
        <PostStep
            title={"Confirmation"}
            canContinue={true}
            step={1}
            final
            noBack
            done
        >
            <ConfirmScreen />
        </PostStep>
    );
};

const ConfirmScreen = () => {
    const user = useSelector((state) => state.app.user);
    const postDetails = useSelector((state) => state.post.postDetails);
    const [posted, setPosted] = useState(false);

    const handleUpload = async () => {
        console.log("Attempting publish");
        console.log(postDetails);
        setPosted(false);
        const userID = user.userID;
        await publishItem(userID, postDetails);
        setPosted(true);
    };

    useEffect(() => {
        handleUpload();
    }, []);

    const LoadingScreen = () => {
        return (
            <Center flex={1}>
                <HStack alignItems={"center"} space={3}>
                    <Spinner size={"lg"} color={"muted.900"} />
                    <Heading>Please wait...</Heading>
                </HStack>
            </Center>
        );
    };

    const Confirm = () => {
        return (
            <VStack p={2}>
                <VStack>
                    <Box bg={"green.200"} p={6}>
                        <Center m={2}>
                            <Box
                                bg={"muted.50"}
                                p={2}
                                borderRadius={"full"}
                                borderWidth={3}
                                borderColor={"green.500"}
                            >
                                <Icon
                                    as={Ionicons}
                                    name={"checkmark-done"}
                                    size={"50px"}
                                    color={"green.500"}
                                />
                            </Box>
                        </Center>
                        <Heading mb={2} textAlign={"center"}>
                            Success!
                        </Heading>
                        <Text textAlign={"center"}>
                            Your item has been successfully published! Your on
                            your way to another sale
                        </Text>
                    </Box>
                    <Box bg={"green.100"}>
                        <Center p={2}>
                            <HStack alignItems={"center"} space={1}>
                                <Icon
                                    as={Ionicons}
                                    name={"help-buoy"}
                                    opacity={0.6}
                                    color={"black"}
                                />

                                <Text opacity={0.6} color={"black"}>
                                    Something wrong?
                                </Text>
                            </HStack>
                        </Center>
                    </Box>
                    <Heading size={"sm"} mt={8} mb={2}>
                        Next Steps
                    </Heading>
                    <VStack space={2}>
                        <ReviewButton />
                        <PromoteButton />
                    </VStack>
                </VStack>
            </VStack>
        );
    };
    return <Center flex={1}>{posted ? <Confirm /> : <LoadingScreen />}</Center>;
};

const ReviewButton = (props) => {
    return <NextStepButton label={"Rate your experience"} icon={"star"} />;
};

const PromoteButton = (props) => {
    return <NextStepButton label={"Promote your listing"} icon={"megaphone"} />;
};

const NextStepButton = ({ label, icon, ...props }) => {
    return (
        <Button
            borderRadius={0}
            colorScheme={"muted"}
            bg={"muted.100"}
            size={"lg"}
            borderWidth={1}
            borderColor={"muted.700"}
            _text={{ fontWeight: "bold", color: "black" }}
            leftIcon={<Icon as={Ionicons} name={icon} color={"black"} mr={2} />}
            _pressed={{ bg: "muted.200" }}
            {...props}
        >
            {label}
        </Button>
    );
};
export default ConfirmStep;
