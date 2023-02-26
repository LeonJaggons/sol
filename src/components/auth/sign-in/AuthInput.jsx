import { Heading, VStack, Input } from "native-base";
import React, { forwardRef } from "react";

export const AuthInput = forwardRef((props, ref) => {
    return (
        <>
            <Heading size={"xs"} fontWeight={800} mb={1}>
                {props.label}
            </Heading>
            <Input
                ref={ref}
                type={props.isPassword && "password"}
                borderRadius={0}
                bg={"muted.200"}
                borderColor={"transparent"}
                fontSize={16}
                _focus={{ borderColor: "muted.800", bg: "white" }}
                {...props}
            />
        </>
    );
});
