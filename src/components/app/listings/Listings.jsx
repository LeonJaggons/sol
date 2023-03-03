import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Box, Button, Heading, HStack, Icon, Text, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "react-native-vector-icons";
import SavedListings from "./SavedListings";
const Listings = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={"Your Listings"} component={ListingsMain} />
            <Stack.Screen name={"Saved"} component={SavedListings} />
            {/* <Stack.Screen name={"Viewed"} component={RecentlyViewed} /> */}
        </Stack.Navigator>
    );
};

const ListingsMain = () => {
    return (
        <Box flex={1} safeAreaTop p={2} bg={"white"}>
            <Heading>Listings</Heading>
            <HStack mt={2} columns={2} w={"full"} flexWrap={"wrap"}>
                <ListingButton
                    label={"Saved Listings"}
                    screenName={"Saved"}
                    icon={"heart"}
                />
            </HStack>
        </Box>
    );
};

const ListingButton = ({ screenName, label, icon, ...props }) => {
    const nav = useNavigation();
    const handlePress = () => {
        screenName && nav.navigate(screenName);
    };

    return (
        <Box style={{ flexGrow: 1, flexShrink: 1, flexBasis: "50%" }} p={1}>
            <Button
                {...props}
                onPress={handlePress}
                justifyContent={"flex-start"}
                p={4}
                colorScheme={"muted"}
                variant={"outline"}
            >
                <VStack alignItems={"flex-start"} w={"full"}>
                    <Icon
                        as={Ionicons}
                        name={icon + "-outline"}
                        size={"xl"}
                        color={"black"}
                    />
                    <Text>{label}</Text>
                </VStack>
            </Button>
        </Box>
    );
};

export default Listings;
