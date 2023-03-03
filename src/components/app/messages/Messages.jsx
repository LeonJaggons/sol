import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Inbox from "./Inbox";

const Messages = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen name={"Inbox"} component={Inbox} />
        </Stack.Navigator>
    );
};

export default Messages;
