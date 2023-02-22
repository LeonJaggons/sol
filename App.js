import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Box, Heading, NativeBaseProvider } from "native-base";
import { StyleSheet, Text, View } from "react-native";
import AppStack from "./src/components/app/AppStack";
import AuthStack from "./src/components/auth/AuthStack";

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
            {true ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    );
}
