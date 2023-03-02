import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TitleImgStep from "./ImageStep";
import MainDetailsStep from "./MainDetailsStep";
import PriceStep from "./PriceStep";
import ReviewStep from "./ReviewStep";
import ConfirmStep from "./ConfirmStep";

const Post = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen name="Post Images" component={TitleImgStep} />
            <Stack.Screen name="Main Details" component={MainDetailsStep} />
            <Stack.Screen name="Price" component={PriceStep} />
            <Stack.Screen name="Review" component={ReviewStep} />
            <Stack.Screen name="Confirm" component={ConfirmStep} />
        </Stack.Navigator>
    );
};

export default Post;
