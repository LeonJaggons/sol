import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Inbox from "./Inbox";
import MessageFocus from "./MessageFocus";

const Messages = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen name={"Inbox"} component={Inbox} />
            <Stack.Screen name={"Message"} component={MessageFocus} />
        </Stack.Navigator>
    );
};

export default Messages;
