import {
    Box,
    Text,
    VStack,
    HStack,
    Heading,
    Button,
    Avatar,
    Icon,
    Pressable,
} from "native-base";
import React from "react";
import BackButton from "../../util/BackButton";
import { AuthInput } from "../sign-in/AuthInput";
import { Ionicons } from "react-native-vector-icons";
const SignUp = () => {
    return (
        <VStack p={4} flex={1} justifyContent={"center"} space={4}>
            <HStack alignItems={"center"} space={2} mb={4}>
                <BackButton />
                <Heading>Sign Up</Heading>
            </HStack>
            <VStack space={4} w={"full"}>
                <AddProfileImage />
                <AuthInput label={"First Name"} />
                <AuthInput label={"Last Name"} />
                <AuthInput label={"Phone"} />
                <AuthInput label={"Email address"} />
                <HStack w={"full"} space={2}>
                    <AuthInput label={"Password"} flex={1} />
                    <AuthInput label={"Confirm password"} flex={1} />
                </HStack>
                <Button
                    borderRadius={0}
                    colorScheme={"muted"}
                    bg={"black"}
                    size={"lg"}
                    _text={{ fontWeight: "bold" }}
                >
                    Continue
                </Button>
            </VStack>
        </VStack>
    );
};

const AddProfileImage = () => {
    return (
        <Pressable alignSelf={"center"}>
            <Avatar
                size={"xl"}
                bg={"muted.200"}
                borderColor={"muted.500"}
                borderWidth={4}
            >
                <Icon
                    as={Ionicons}
                    name={"person-add"}
                    size={"xl"}
                    color={"muted.500"}
                />
            </Avatar>
        </Pressable>
    );
};

export default SignUp;
