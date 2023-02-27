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
    Input,
    Toast,
    useToast,
    Alert,
    AlertDialog,
} from "native-base";
import { Ionicons } from "react-native-vector-icons";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AuthInput } from "./AuthInput";
import { omit } from "lodash";
import { attemptSignIn } from "../../../firebase/fire-auth";

const SignInMain = () => {
    const nav = useNavigation();

    const goSignUp = () => {
        return nav.navigate("SignUp");
    };

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
                        onPress={goSignUp}
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
    const passwordRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({});
    const updateUser = (param, val) => {
        if (val === "" || val == null) setUser(omit(user, [param]));
        else setUser({ ...user, [param]: val });
    };
    const setEmail = (e) => updateUser("email", e);
    const setPassword = (e) => updateUser("password", e);
    const [canSubmit, setCanSubmit] = useState(false);

    const updateCanSubmit = () => {
        setCanSubmit(user.email != null && user.password != null && !loading);
    };

    useEffect(() => {
        updateCanSubmit();
    }, [user]);

    const toast = useToast();
    const handleSubmit = async () => {
        setLoading(true);
        await attemptSignIn(user).catch((e) => {
            console.log(e.code, e.message);
            const errorDescription = {
                "auth/wrong-password":
                    "Sorry, that password doesn't match. Please try again.",
                "auth/too-many-requests": "Too many attempts, try again later.",
                "auth/user-not-found":
                    "No user found with that email address..",
            };
            toast.show({
                render: () => {
                    return (
                        <Alert
                            status={"error"}
                            title={"Login Failed"}
                            variant={"top-accent"}
                        >
                            <VStack space={2} flexShrink={1} w="100%">
                                <HStack
                                    flexShrink={1}
                                    space={2}
                                    justifyContent="space-between"
                                >
                                    <HStack space={4} flexShrink={1}>
                                        <Alert.Icon mt="1" size={"lg"} />
                                        <VStack>
                                            <Text
                                                fontSize="lg"
                                                color="coolGray.800"
                                                fontWeight={"bold"}
                                            >
                                                Login Failed
                                            </Text>
                                            <Text>
                                                {errorDescription[[e.code]]}
                                            </Text>
                                        </VStack>
                                    </HStack>
                                </HStack>
                            </VStack>
                        </Alert>
                    );
                },
            });
        });
        setLoading(false);
    };

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
            <AuthInput
                label={"Email"}
                onChangeText={setEmail}
                onSubmitEditing={() => passwordRef.current.focus()}
                returnKeyType={"next"}
                blurOnSubmit={false}
            />
            <VStack>
                <AuthInput
                    onChangeText={setPassword}
                    label={"Password"}
                    isPassword
                    ref={passwordRef}
                    onSubmitEditing={handleSubmit}
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
                isDisabled={!canSubmit}
                isLoading={loading}
                onPress={handleSubmit}
                isLoadingText={"Please wait..."}
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
