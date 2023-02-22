import { Heading, VStack, Input } from "native-base";
import React from "react";

export const AuthInput = ({ label, isPassword }) => {
    return (
        <VStack space={1}>
            <Heading size={"xs"} fontWeight={800}>
                {label}
            </Heading>
            <Input type={isPassword && "password"} borderRadius={0} />
        </VStack>
    );
};
