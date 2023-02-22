import { Heading, VStack, Input } from "native-base";
import React from "react";

export const AuthInput = ({ label, isPassword, ...props }) => {
    return (
        <VStack space={1} {...props}>
            <Heading size={"xs"} fontWeight={800}>
                {label}
            </Heading>
            <Input
                type={isPassword && "password"}
                borderRadius={0}
                bg={"muted.200"}
                borderColor={"transparent"}
                fontSize={16}
                _focus={{ borderColor: "muted.800", bg: "white" }}
            />
        </VStack>
    );
};
