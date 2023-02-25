import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Box, Heading } from "native-base";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import React from "react";
import Explore from "./explore/Explore";
import Account from "./account/Account";
import Post from "./post/Post";
import { createStackNavigator } from "@react-navigation/stack";
import CategoriesPanel from "../util/CategoriesPanel";
const AppStack = () => {
    const Tabs = createBottomTabNavigator();
    const tabParams = [
        { name: "Explore", component: Explore, icon: "compass" },
        { name: "Listings", component: Dummy, icon: "store" },
        { name: "Post", component: Post, icon: "tag" },
        { name: "Messages", component: Dummy, icon: "email" },
        { name: "Account", component: Account, icon: "account" },
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
                                name={
                                    tab.icon +
                                    (params.focused ? "" : "-outline")
                                }
                                {...params}
                            />
                        ),
                    }}
                />
            ))}
        </Tabs.Navigator>
    );
};

const GlobalStack = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={"APP"} component={AppStack} />
            <Stack.Screen name={"CATEGORIES"} component={CategoriesPanel} />
        </Stack.Navigator>
    );
};

const Dummy = () => {
    return (
        <Box>
            <Heading>Dummy</Heading>
        </Box>
    );
};
export default GlobalStack;
