import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { isEmpty } from "lodash";
import { NativeBaseProvider } from "native-base";
import { useEffect, useState } from "react";
import { LogBox } from "react-native";
import { Provider, useSelector } from "react-redux";
import AppStack from "./src/components/app/AppStack";
import AuthStack from "./src/components/auth/AuthStack";
import "./src/firebase/firebase-init.js";
import store from "./src/redux/store";

LogBox.ignoreLogs(["AsyncStorage..."]);

export default function Application() {
    return (
        <NativeBaseProvider>
            <Provider store={store}>
                <NavigationContainer>
                    <App />
                </NavigationContainer>
            </Provider>
        </NativeBaseProvider>
    );
}

function App() {
    const Stack = createStackNavigator();
    const nav = useNavigation();
    const user = useSelector((state) => state.app.user);

    const handleAccessApp = () => {
        const isLoggedIn = user && !isEmpty(user);
        const navDestination = isLoggedIn ? "APPLICATION" : "AUTHENTICATE";
        nav.navigate(navDestination);
    };

    useEffect(() => {
        handleAccessApp();
    }, [user]);
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={"AUTHENTICATE"} component={AuthStack} />
            <Stack.Screen name={"APPLICATION"} component={AppStack} />
        </Stack.Navigator>
    );
}
