import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import { LogBox } from "react-native";
import AppStack from "./src/components/app/AppStack";
import AuthStack from "./src/components/auth/AuthStack";
import "./src/firebase/firebase-init.js";

LogBox.ignoreLogs(["AsyncStorage..."]);
export default function Application() {
    return (
        <NativeBaseProvider>
            <App />
        </NativeBaseProvider>
    );
}

function App() {
    return (
        <NavigationContainer>
            {false ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    );
}
