import { useNavigation } from "@react-navigation/native";
import { Button, Icon, IconButton } from "native-base";
import React from "react";
import { Ionicons } from "react-native-vector-icons";

const BackButton = () => {
    const nav = useNavigation();
    return (
        <IconButton
            colorScheme={"muted"}
            onPress={nav.goBack}
            icon={<Icon as={Ionicons} name={"chevron-back"} />}
        ></IconButton>
    );
};

export default BackButton;
