import { createStackNavigator } from "@react-navigation/stack";
import {
    Button,
    Center,
    Divider,
    Heading,
    HStack,
    Icon,
    Input,
    Text,
    VStack,
} from "native-base";
import React from "react";
import { Ionicons } from "react-native-vector-icons";
import SignInMain from "./SignInMain";
import SignInPhone from "./SignInPhone";

const SignIn = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={"Sign In"} component={SignInMain} />
            <Stack.Screen name={"Sign In Phone"} component={SignInPhone} />
        </Stack.Navigator>
    );
};
export default SignIn;
