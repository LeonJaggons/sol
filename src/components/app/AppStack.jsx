import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Box, Heading } from "native-base";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import Explore from "./explore/Explore";
import Account from "./account/Account";
import Post from "./post/Post";
import CategoriesPanel from "../util/CategoriesPanel";
import Listings from "./listings/Listings";
import Messages from "./messages/Messages";
import { subscribeUserMessages } from "../../firebase/fire-store";

const AppStack = () => {
    const Tabs = createBottomTabNavigator();

    useEffect(() => {
        const unsub = subscribeUserMessages();

        return () => {
            unsub();
        };
    }, []);
    const tabParams = [
        {
            name: "Explore",
            component: Explore,
            icon: "compass",
            headerShown: false,
        },
        {
            name: "Listings",
            component: Listings,
            icon: "store",
            headerShown: false,
        },
        { name: "Post", component: Post, icon: "tag", headerShown: false },
        {
            name: "Messages",
            component: Messages,
            icon: "email",
            headerShown: false,
        },
        {
            name: "Account",
            component: Account,
            icon: "account",
            headerShown: true,
        },
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
                        headerShown: tab.headerShown,
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
