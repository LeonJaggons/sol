import { NavigationContainer } from "@react-navigation/native";
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
                <App />
            </Provider>
        </NativeBaseProvider>
    );
}

function App() {
    const user = useSelector((state) => state.app.user);
    const [isApp, setIsApp] = useState(false);
    const handleAccessApp = () => {
        setIsApp(user && !isEmpty(user));
    };

    useEffect(() => {
        handleAccessApp();
    }, [user]);
    return (
        <NavigationContainer>
            {isApp ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    );
}
