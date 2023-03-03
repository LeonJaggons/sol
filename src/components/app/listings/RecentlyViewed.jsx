import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Center, Heading } from "native-base";

const RecentlyViewed = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={"Recently Viewed"}
                component={Dummy}
            ></Stack.Screen>
        </Stack.Navigator>
    );
};

const Dummy = () => {
    return (
        <Center>
            <Heading>HI</Heading>
        </Center>
    );
};

export default RecentlyViewed;
