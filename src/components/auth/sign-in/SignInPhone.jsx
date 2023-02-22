import { VStack, Heading, HStack, Card, Button } from "native-base";
import React from "react";
import BackButton from "../../util/BackButton";
import { AuthInput } from "./AuthInput";

const SignInPhone = () => {
    return (
        <VStack p={4} flex={1} justifyContent={"center"} space={4}>
            <HStack alignItems={"center"} space={2} mb={4}>
                <BackButton />
                <Heading>Sign in with Phone</Heading>
            </HStack>
            <AuthInput label={"Enter your phone number"} />
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
    );
};

export default SignInPhone;
