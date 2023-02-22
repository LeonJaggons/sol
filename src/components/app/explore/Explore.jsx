import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import ExploreMain from "./ExploreMain";

const Explore = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={"ExploreMain"} component={ExploreMain} />
        </Stack.Navigator>
    );
};

export default Explore;
