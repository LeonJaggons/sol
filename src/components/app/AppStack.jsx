import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Box, Heading } from "native-base";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import React from "react";
import Explore from "./explore/Explore";

const AppStack = () => {
    const Tabs = createBottomTabNavigator();
    const tabParams = [
        { name: "Explore", component: Explore, icon: "compass" },
        { name: "Listings", component: Dummy, icon: "store" },
        { name: "Messages", component: Dummy, icon: "mail" },
        { name: "Account", component: Dummy, icon: "account" },
    ];
    return (
        <Tabs.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "black",
            }}
        >
            {tabParams.map((tab) => (
                <Tabs.Screen
                    key={tab.name.toUpperCase()}
                    {...tab}
                    options={{
                        tabBarIcon: (params) => (
                            <MaterialCommunityIcons
                                name={tab.icon}
                                {...params}
                            />
                        ),
                    }}
                />
            ))}
        </Tabs.Navigator>
    );
};

const Dummy = () => {
    return (
        <Box>
            <Heading>Dummy</Heading>
        </Box>
    );
};
export default AppStack;
