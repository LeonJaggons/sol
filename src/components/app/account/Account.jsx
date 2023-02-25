import React from "react";
import {
    Avatar,
    Box,
    Divider,
    Heading,
    HStack,
    Icon,
    IconButton,
    ScrollView,
    Text,
    Pressable,
    VStack,
} from "native-base";
import { useSelector } from "react-redux";
import BackButton from "../../util/BackButton";
import { Ionicons, MaterialCommunityIcons } from "react-native-vector-icons";
const Account = () => {
    return (
        <Box safeArea>
            <HStack
                alignItems={"center"}
                justifyContent={"space-between"}
                py={2}
                bg={"white"}
            >
                <BackButton />
                <Heading size={"md"}>Account</Heading>
                <Box opacity={0}>
                    <BackButton />
                </Box>
            </HStack>
            <ScrollView showsVerticalScrollIndicator={false}>
                <AccountHeaderCard />
                <ListingsSection />
                <SavesSection />
                <ProfileSection />
                <NotificationsSection />
            </ScrollView>
        </Box>
    );
};

const AccountHeaderCard = () => {
    const user = useSelector((state) => state.app.user);
    return (
        <HStack
            space={4}
            alignSelf={"center"}
            w={"full"}
            bg={"white"}
            py={4}
            px={2}
        >
            <Avatar
                size={"md"}
                source={{ uri: user.img }}
                borderWidth={2}
                borderColor={"white"}
            />
            <VStack justifyContent={"space-around"} flex={1}>
                <Text color={"muted.400"} fontWeight={500}>
                    Welcome
                </Text>
                <Heading size={"sm"}>
                    {user.firstName + " " + user.lastName}
                </Heading>
            </VStack>
            <IconButton
                icon={<Icon as={Ionicons} name={"chevron-forward"} />}
                colorScheme={"muted"}
            />
        </HStack>
    );
};

const AccountSection = ({ title, items }) => {
    return (
        <VStack>
            <Heading size={"sm"} p={4} py={2} color={"muted.800"}>
                {title}
            </Heading>
            <VStack bg={"white"}>
                {items.map((item) => (
                    <Pressable
                        onH
                        _pressed={{
                            bg: "muted.100",
                        }}
                    >
                        <HStack py={2.5} px={4} alignItems={"center"}>
                            <HStack flex={1} space={4} alignItems={"center"}>
                                <Box
                                    bg={"gray.200"}
                                    borderRadius={"full"}
                                    p={2}
                                    style={{ aspectRatio: 1 }}
                                >
                                    <Icon
                                        as={MaterialCommunityIcons}
                                        name={item.icon}
                                        color={"muted.900"}
                                        size={"18px"}
                                    />
                                </Box>
                                <Heading size={"xs"} fontWeight={600}>
                                    {item.label}
                                </Heading>
                            </HStack>
                            <IconButton
                                pt={0}
                                pb={0}
                                pl={0}
                                variant={"unstyled"}
                                icon={
                                    <Icon
                                        as={Ionicons}
                                        name={"chevron-forward"}
                                    />
                                }
                                colorScheme={"muted"}
                            />
                        </HStack>
                    </Pressable>
                ))}
            </VStack>
        </VStack>
    );
};

const ProfileSection = () => {
    const profileItems = [
        { label: "Profile", icon: "account" },
        { label: "Email address", icon: "email" },
        { label: "Password", icon: "lock" },
        { label: "Phone", icon: "phone" },
        { label: "Home address", icon: "home" },
    ];
    return <AccountSection title={"Profile"} items={profileItems} />;
};

const NotificationsSection = () => {
    const notificationItems = [
        { label: "Profile", icon: "account" },
        { label: "Email address", icon: "email" },
        { label: "Password", icon: "lock" },
        { label: "Home address", icon: "home" },
    ];
    return <AccountSection title={"Notifications"} items={notificationItems} />;
};
const SavesSection = () => {
    const savesItems = [
        { label: "Saved items", icon: "heart" },
        { label: "Saved alerts", icon: "bell-badge" },
        { label: "Recently viewed", icon: "clock" },
    ];
    return <AccountSection title={"Saves & Recents"} items={savesItems} />;
};
const ListingsSection = () => {
    const listingItems = [{ label: "My Listings ", icon: "tag-multiple" }];
    return <AccountSection title={"Listings"} items={listingItems} />;
};
export default Account;
