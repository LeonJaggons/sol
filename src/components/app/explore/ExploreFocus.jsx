import React, { useEffect, useState } from "react";
import {
    Box,
    Center,
    Heading,
    HStack,
    Spinner,
    VStack,
    Text,
    Button,
    ScrollView,
    Icon,
    IconButton,
    Skeleton,
    Avatar,
    Image,
    Divider,
} from "native-base";
import { ImageDisplay } from "../../util/ImageDisplay";
import { getFocusItemData } from "../../../firebase/fire-store";
import { Ionicons } from "react-native-vector-icons";
import { getUserData } from "../../../firebase/fire-auth";
import moment from "moment";
import MapView, { MapMarker } from "react-native-maps";
const ExploreFocus = ({ route }) => {
    const { itemID } = route.params;
    const [item, setItem] = useState();

    const loadItemData = async () => {
        const itemData = await getFocusItemData(itemID);
        setItem({ ...itemData });
    };

    useEffect(() => {
        loadItemData();
    }, []);
    useEffect(() => {
        console.log(item);
    }, [item]);
    return item ? (
        <Box flex={1} safeArea bg={"white"}>
            <FocusDisplay item={item} />
        </Box>
    ) : (
        <Center flex={1} bg={"white"}>
            <Spinner size={"lg"} color={"muted.300"} />
        </Center>
    );
};

const FocusDisplay = ({ item }) => {
    return (
        <VStack flex={1}>
            <ScrollView
                contentContainerStyle={{
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <ImageDisplay imgs={item.imgs} />
                <VStack space={4} p={3} py={1} pb={100}>
                    <VStack space={2}>
                        <FocusHeader item={item} />
                        <Text color={"muted.500"} fontSize={"sm"}>
                            Published on{" "}
                            {moment(item.created.toDate()).format("M/D/Y")}
                        </Text>
                    </VStack>
                    <Divider bg={"muted.100"} />
                    <VStack space={1}>
                        <Heading size={"md"}>Description</Heading>
                        <Text fontSize={"sm"} color={"muted.600"}>
                            {item.description}
                        </Text>
                    </VStack>

                    <Divider bg={"muted.100"} />
                    <VStack space={1}>
                        <Heading size={"md"}>Details</Heading>
                        <HStack
                            alignItems={"center"}
                            justifyContent={"space-between"}
                        >
                            <Text fontSize={16}>Condition</Text>
                            <Text fontSize={16}>{item.condition}</Text>
                        </HStack>
                    </VStack>
                    <Divider bg={"muted.100"} />
                    <VStack space={1}>
                        <Heading size={"md"}>Seller Details</Heading>
                        <SellerCard item={item} />
                    </VStack>
                    <Divider bg={"muted.100"} />
                    <LocationSection item={item} />
                </VStack>
            </ScrollView>
            <FocusFooter item={item} />
        </VStack>
    );
};

const FocusHeader = ({ item }) => {
    return (
        <HStack justifyContent={"space-between"} alignItems={"center"}>
            <VStack alignItems={"flex-start"}>
                <Heading size={"xl"}>{item.title}</Heading>
                <CategorySlide item={item} single />
            </VStack>
            <LikeButton />
        </HStack>
    );
};

const SellerCard = ({ item }) => {
    const [seller, setSeller] = useState();
    const loadSellerData = async () => {
        const sellerUserID = item.userID;
        const sellerData = await getUserData(sellerUserID);
        setSeller({ ...sellerData });
    };
    useEffect(() => {
        loadSellerData();
    }, []);
    return seller ? (
        <VStack>
            <HStack space={2} p={2}>
                <Image
                    boxSize={"55px"}
                    alt={"Seller image"}
                    borderRadius={10}
                    source={{ uri: seller.img }}
                />
                <VStack>
                    <Heading size={"sm"}>
                        {seller.firstName} {seller.lastName[0]}.
                    </Heading>
                    <Text fontSize={"sm"}>
                        Member since{" "}
                        {moment(seller.created).format("MMMM YYYY")}
                    </Text>
                </VStack>
            </HStack>
        </VStack>
    ) : (
        <Skeleton />
    );
};
const CategorySlide = ({ item, single }) => {
    return single ? (
        <Button
            colorScheme={"lightBlue"}
            p={0}
            variant={"link"}
            _text={{
                fontWeight: "medium",
                fontSize: 14,
            }}
        >
            {item.category[item.category.length - 1]}
        </Button>
    ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <HStack space={"2px"} alignItems={"center"}>
                {item.category.map((i, ind) => (
                    <HStack alignItems={"center"} flex={1} key={"CAT-" + ind}>
                        <Button
                            variant={"link"}
                            colorScheme={"muted"}
                            p={0}
                            _text={{
                                color: "pink.600",
                                fontWeight: "medium",
                                fontSize: 12,
                            }}
                        >
                            {i}
                        </Button>
                        {ind !== item.category.length - 1 && (
                            <Text color={"muted.300"} my={".75px"}>
                                {"/"}
                            </Text>
                        )}
                    </HStack>
                ))}
            </HStack>
        </ScrollView>
    );
};

const LocationSection = ({ item }) => {
    return (
        <VStack space={1}>
            <Heading size={"md"}>Meetup Info</Heading>
            <Box overflow={"hidden"} borderRadius={5}>
                <MapView
                    style={{ height: 120, width: "100%" }}
                    initialRegion={{
                        latitude: item.location.latitude,
                        longitude: item.location.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    <MapMarker
                        coordinate={{
                            latitude: item.location.latitude,
                            longitude: item.location.longitude,
                        }}
                    />
                </MapView>
            </Box>
            <VStack space={1}>
                <Text fontSize={16} color={"muted.900"} fontWeight={600}>
                    {item.location.city}, {item.location.state}
                </Text>
                <HStack alignItems={"center"} space={1}>
                    <Icon
                        as={Ionicons}
                        name={"information-circle-outline"}
                        color={"muted.500"}
                    />
                    <Text fontSize={12} color={"muted.500"}>
                        Location is approximate to protect seller privacy
                    </Text>
                </HStack>
            </VStack>
        </VStack>
    );
};

const FocusFooter = ({ item }) => {
    return (
        <HStack
            p={4}
            borderTopWidth={1}
            borderTopColor={"muted.100"}
            w={"full"}
            zIndex={999}
            position={"absolute"}
            alignSelf={"center"}
            bottom={0}
            bg={"white"}
            space={2}
        >
            <VStack alignItems={"flex-end"} mr={1}>
                <Heading size={"md"} fontWeight={"black"}>
                    ${item.price}.00
                </Heading>
                <Text color={"muted.400"} fontSize={12}>
                    Addtl Info
                </Text>
            </VStack>
            {/* <Button
                borderRadius={0}
                bg={"transparent"}
                borderColor={"black"}
                borderWidth={1}
                _text={{ fontWeight: "medium", color: "black" }}
                _pressed={{ bg: "muted.200" }}
            >
                Buy now
            </Button> */}
            <Button
                borderRadius={0}
                colorScheme={"muted"}
                bg={"black"}
                _text={{ fontWeight: "bold" }}
                flex={1}
                leftIcon={<Icon as={Ionicons} name={"chatbubble-ellipses"} />}
            >
                Message Seller
            </Button>
        </HStack>
    );
};

const LikeButton = () => {
    return (
        <IconButton
            borderRadius={0}
            size={"lg"}
            variant={"ghost"}
            colorScheme={"muted"}
            icon={<Icon as={Ionicons} name={"heart-outline"} />}
        />
    );
};
export default ExploreFocus;
