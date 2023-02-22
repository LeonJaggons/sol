import {
    Box,
    Heading,
    Text,
    VStack,
    Button,
    HStack,
    Divider,
    Icon,
    ScrollView,
    Center,
} from "native-base";
import { Ionicons } from "react-native-vector-icons";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { AuthInput } from "./AuthInput";

const SignInMain = () => {
    return (
        <ScrollView
            contentContainerStyle={{
                marginTop: 80,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <VStack
                w={"full"}
                p={4}
                flex={1}
                justifyContent={"center"}
                overflowY={"scroll"}
            >
                <Heading size={"lg"}>Welcome to Sol,</Heading>
                <Heading>Sign in to Continue</Heading>
                <HStack my={6} alignItems={"center"}>
                    <Text>Don't have an account? </Text>
                    <Button
                        variant={"ghost"}
                        p={0}
                        alignItems={"flex-start"}
                        justifyContent={"flex-start"}
                        _text={{ textAlign: "left" }}
                        colorScheme={"muted"}
                    >
                        Click here
                    </Button>
                    <Text> to create one.</Text>
                </HStack>
                <Box>
                    <SignInForm />
                </Box>
            </VStack>
        </ScrollView>
    );
};

const SignInForm = () => {
    const OrDivider = () => {
        return (
            <HStack alignItems={"center"} space={2}>
                <Divider flex={1} />
                <Text fontWeight={"bold"} color={"gray.400"}>
                    or
                </Text>
                <Divider flex={1} />
            </HStack>
        );
    };
    return (
        <VStack space={4} w={"full"}>
            <AuthInput label={"Email"} />
            <VStack>
                <AuthInput
                    label={"Password"}
                    placeholder={"Password "}
                    isPassword
                />
                <Button
                    variant={"link"}
                    py={1}
                    alignSelf={"flex-end"}
                    colorScheme={"muted"}
                    _text={{
                        color: "muted.500",
                        fontWeight: 700,
                        fontSize: 12,
                    }}
                >
                    Forgot password?
                </Button>
            </VStack>
            <Button
                borderRadius={0}
                colorScheme={"muted"}
                bg={"black"}
                size={"lg"}
                _text={{ fontWeight: "bold" }}
            >
                Continue
            </Button>
            <OrDivider />
            <SocialAuthButton provider={"mobile"} />
            <SocialAuthButton provider={"Google"} />
        </VStack>
    );
};

const SocialAuthButton = ({ provider }) => {
    const nav = useNavigation();
    const providerParams = {
        mobile: {
            icon: "phone-portrait",
            route: "Sign In Phone",
        },
        Google: {
            icon: "logo-google",
        },
        Apple: {
            icon: "logo-apple",
        },
    };
    const providerParam = providerParams[[provider]];

    const navigatePage = () => {
        providerParam.route && nav.navigate(providerParam.route);
    };
    return (
        <Button
            size={"md"}
            colorScheme={"muted"}
            borderRadius={0}
            variant={"outline"}
            _text={{ fontWeight: "semibold", color: "black" }}
            leftIcon={
                <Icon as={Ionicons} name={providerParam.icon} size={5} mr={1} />
            }
            onPress={navigatePage}
        >
            {"Sign in with " + provider}
        </Button>
    );
};

export default SignInMain;
