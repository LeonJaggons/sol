import { View, Text } from "react-native";
import React, { forwardRef } from "react";
import { Input, TextArea } from "native-base";

const SolInput = forwardRef((props, ref) => {
    return (
        <Input
            ref={ref}
            borderRadius={0}
            bg={"muted.200"}
            borderColor={"transparent"}
            fontSize={16}
            _focus={{ borderColor: "muted.800", bg: "white" }}
            {...props}
        />
    );
});

export const SolTextArea = forwardRef((props, ref) => {
    return (
        <TextArea
            ref={ref}
            borderRadius={0}
            bg={"muted.200"}
            borderColor={"transparent"}
            fontSize={16}
            _focus={{ borderColor: "muted.800", bg: "white" }}
            {...props}
        />
    );
});
export default SolInput;
