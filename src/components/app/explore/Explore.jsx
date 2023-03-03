import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import ExploreFocus from "./ExploreFocus";
import ExploreMain from "./ExploreMain";
import ExploreSearch from "./ExploreSearch";
import MessageSeller from "./MessageSeller";

const Explore = () => {
    const dispatch = useDispatch();
    const Stack = createStackNavigator();
    useEffect(() => {
        dispatch({
            type: "SET",
            attr: "postCategory",
            payload: null,
        });
        dispatch({
            type: "SET",
            attr: "postDetails",
            payload: {},
        });
    }, []);
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={"ExploreMain"} component={ExploreMain} />
            <Stack.Screen name={"Explore Focus"} component={ExploreFocus} />
            <Stack.Screen name={"Explore Search"} component={ExploreSearch} />
            <Stack.Screen
                name={"Message"}
                component={MessageSeller}
                options={{ headerShown: true }}
            />
        </Stack.Navigator>
    );
};

export default Explore;
