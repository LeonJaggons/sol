import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TitleImgStep from "./TitleImgStep";
import MainDetailsStep from "./MainDetailsStep";
import PriceStep from "./PriceStep";

const Post = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="Post Images"
                component={TitleImgStep}
            ></Stack.Screen>
            <Stack.Screen
                name="Main Details"
                component={MainDetailsStep}
            ></Stack.Screen>
            <Stack.Screen name="Price" component={PriceStep}></Stack.Screen>
        </Stack.Navigator>
    );
};

export default Post;
