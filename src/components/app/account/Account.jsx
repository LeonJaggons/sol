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
        <Box flex={1} bg={"white"}>
            {/* <HStack
                alignItems={"center"}
                justifyContent={"space-between"}
                p={2}
                bg={"white"}
            >
                <BackButton />
                <Heading size={"md"}>Account</Heading>
                <Box opacity={0}>
                    <BackButton />
                </Box>
            </HStack> */}
            <ScrollView showsVerticalScrollIndicator={false}>
                <AccountHeaderCard />
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
            pr={4}
        >
            <Avatar
                size={"md"}
                source={{ uri: user.img }}
                borderWidth={2}
                borderColor={"white"}
            />
            <VStack justifyContent={"space-between"} flex={1}>
                <Text color={"muted.400"} fontWeight={500}>
                    Welcome
                </Text>
                <Heading size={"md"}>
                    {user.firstName + " " + user.lastName}
                </Heading>
            </VStack>
            <IconButton
                icon={
                    <Icon
                        as={Ionicons}
                        name={"chevron-forward"}
                        color={"black"}
                    />
                }
                colorScheme={"muted"}
            />
        </HStack>
    );
};

const AccountSection = ({ title, items }) => {
    return (
        <VStack>
            <HStack bg={"muted.100"}>
                <Heading size={"md"} p={4} py={2} color={"muted.800"}>
                    {title}
                </Heading>
            </HStack>
            <VStack bg={"white"}>
                {items.map((item, i) => (
                    <MenuItem key={"TITLE-" + i} item={item} />
                ))}
            </VStack>
        </VStack>
    );
};

const MenuItem = ({ item }) => {
    return (
        <Pressable
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
                            size={"19px"}
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
                    icon={<Icon as={Ionicons} name={"chevron-forward"} />}
                    colorScheme={"muted"}
                />
            </HStack>
        </Pressable>
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
