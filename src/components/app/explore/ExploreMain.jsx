import React, { useEffect, useState } from "react";
import {
    Box,
    Center,
    Heading,
    HStack,
    Icon,
    Image,
    Input,
    SimpleGrid,
    Skeleton,
    Spinner,
    VStack,
    Pressable,
    Divider,
} from "native-base";
import { Ionicons } from "react-native-vector-icons";
import SolInput from "../../util/SolInput";
import { getAllItems } from "../../../firebase/fire-store";
import { useIsFocused, useNavigation } from "@react-navigation/native";

const ExploreMain = () => {
    return (
        <Box safeArea p={1} flex={1} bg={"white"}>
            <SolInput
                placeholder={"Search Sol items..."}
                size={"lg"}
                mx={"2px"}
                mb={1}
                mt={2}
                InputLeftElement={<Icon ml={3} as={Ionicons} name={"search"} />}
            />
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
                <HStack columns={3} flexWrap={"wrap"}>
                    {items.map((item) => (
                        <Item item={item} key={item.title} />
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
    const nav = useNavigation();
    const [loading, setLoading] = useState(true);
    const [image, setImage] = useState(null);

    const focusItem = () => {
        nav.navigate("Explore Focus", { itemID: item.itemID });
    };
    const preloadImage = async () => {
        setLoading(true);
        await Image.prefetch(item.imgs[0]);
        setImage("DONE");
    };

    useEffect(() => {
        preloadImage();
    }, []);

    useEffect(() => {
        image && setLoading(false);
    }, [image]);
    return (
        <Center w={"1/3"} p={"1px"} overflow={"hidden"} borderRadius={5}>
            {loading ? (
                <Skeleton startColor={"muted.300"} flex={1} />
            ) : (
                <Pressable onPress={focusItem} _pressed={{ opacity: 0.8 }}>
                    <Image
                        alt={"Picture of " + item.title}
                        borderRadius={3}
                        source={{ uri: item.imgs[0] }}
                        w={"full"}
                        style={{ aspectRatio: 1 }}
                    />
                </Pressable>
            )}
        </Center>
    );
};
export default ExploreMain;
