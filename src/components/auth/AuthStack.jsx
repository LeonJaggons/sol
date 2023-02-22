import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Center, Heading } from "native-base";
import SignIn from "./sign-in/SignIn";
import SignUp from "./sign-up/SignUp";

const AuthStack = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={"SignIn"} component={SignIn} />
            <Stack.Screen name={"SignUp"} component={SignUp} />
        </Stack.Navigator>
    );
};

const Dummy = () => {
    return (
        <Center flex={1}>
            <Heading>No Content</Heading>
        </Center>
    );
};
export default AuthStack;
