import { useCallback, useState } from "react";
import {
    Box,
    Divider,
    Heading,
    HStack,
    Image,
    ScrollView,
    VStack,
    Text,
    Icon,
    Button,
    Pressable,
    Center,
    Spinner,
} from "native-base";
import { getSavedListings, toggleLiked } from "../../../firebase/fire-store";
import { Ionicons } from "react-native-vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import ExploreFocus from "../explore/ExploreFocus";
import {
    useFocusEffect,
    useIsFocused,
    useNavigation,
} from "@react-navigation/native";
import { v4 } from "uuid";
const SavedListings = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen name={"Saved Listings"} component={SavedMain} />
            <Stack.Screen name={"Saved Item"} component={ExploreFocus} />
        </Stack.Navigator>
    );
};

const SavedMain = () => {
    return (
        <Box flex={1} p={2} bg={"white"}>
            <SavedGallery />
        </Box>
    );
};

const SavedGallery = () => {
    const [items, setItems] = useState();
    const loadSavedListings = async () => {
        setItems(null);
        const savedItems = await getSavedListings();
        setItems([...savedItems]);
    };

    const clear = () => {
        setItems(null);
    };
    useFocusEffect(
        useCallback(() => {
            loadSavedListings();
        }, [])
    );

    return !items ? (
        <Center flex={1}>
            <Spinner size={"lg"} color={"muted.600"} />
        </Center>
    ) : (
        <Box mt={2} py={2}>
            <ScrollView>
                <VStack>
                    {items.map((item) => (
                        <SavedItem
                            key={item.itemID}
                            item={item}
                            reload={loadSavedListings}
                            clear={clear}
                        />
                    ))}
                </VStack>
            </ScrollView>
        </Box>
    );
};

const SavedItem = ({ item, reload, clear }) => {
    const nav = useNavigation();
    const focusSaved = () => {
        nav.navigate("Saved Item", { itemID: item.itemID });
    };
    const removeLiked = async () => {
        clear();
        await toggleLiked(item.itemID);
        reload();
    };
    return (
        <Pressable onPress={focusSaved}>
            <HStack alignItems={"center"} justifyContent={"space-between"}>
                <HStack space={3}>
                    <Image
                        source={{ uri: item?.imgs[0] }}
                        h={"60px"}
                        style={{ aspectRatio: 1 }}
                        borderRadius={5}
                        alt={item?.title}
                    />
                    <VStack alignItems={"flex-start"}>
                        <Text
                            fontSize={16}
                            fontWeight={600}
                            color={"muted.800"}
                        >
                            {item?.title}
                        </Text>
                        <Button
                            onPress={removeLiked}
                            variant={"link"}
                            colorScheme={"muted"}
                            p={0}
                            _text={{
                                fontSize: "md",
                                fontWeight: 500,
                                color: "muted.400",
                            }}
                        >
                            Remove
                        </Button>
                    </VStack>
                </HStack>
                <Icon as={Ionicons} name={"chevron-forward"} size={"lg"} />
            </HStack>
            <Divider mt={3} bg={"muted.200"} />
        </Pressable>
    );
};

export default SavedListings;
