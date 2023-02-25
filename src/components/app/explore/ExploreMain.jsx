import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import {
    Box,
    Center,
    Heading,
    HStack,
    Image,
    Input,
    SimpleGrid,
    Spinner,
    VStack,
} from "native-base";
import SolInput from "../../util/SolInput";
import { getAllItems } from "../../../firebase/fire-store";
import { useIsFocused } from "@react-navigation/native";

const ExploreMain = () => {
    return (
        <Box safeArea p={4} flex={1}>
            <SolInput placeholder={"Search Sol items..."} size={"lg"} />
            <ExploreGallery />
        </Box>
    );
};

const ExploreGallery = () => {
    const [items, setItems] = useState();
    const isFocused = useIsFocused();
    const loadItems = async () => {
        setItems(null);
        const newItems = await getAllItems();
        setItems([...newItems]);
    };

    useEffect(() => {
        isFocused && loadItems();
    }, [isFocused]);

    return (
        <Box flex={1}>
            {items ? (
                <HStack columns={3}>
                    {items.map((item) => (
                        <Item item={item} />
                    ))}
                </HStack>
            ) : (
                <Center flex={1}>
                    <Spinner size={"lg"} color={"muted.800"} />
                </Center>
            )}
        </Box>
    );
};

const Item = ({ item }) => {
    return (
        <Box w={"1/3"} p={1}>
            <Image
                source={{ uri: item.imgs[0] }}
                w={"full"}
                style={{ aspectRatio: 1 }}
            />
        </Box>
    );
};
export default ExploreMain;
