import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import ExploreMain from "./ExploreMain";

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
        </Stack.Navigator>
    );
};

export default Explore;
