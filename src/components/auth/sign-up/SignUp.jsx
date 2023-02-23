import {
    Box,
    Text,
    VStack,
    HStack,
    Heading,
    Button,
    Avatar,
    Icon,
    Pressable,
    IconButton,
} from "native-base";
import React, { useEffect, useState } from "react";
import BackButton from "../../util/BackButton";
import { AuthInput } from "../sign-in/AuthInput";
import { Ionicons } from "react-native-vector-icons";
import { difference, intersection, omit } from "lodash";
import * as ImagePicker from "expo-image-picker";
const SignUp = () => {
    const [user, setUser] = useState({});
    const updateUser = (param, val) => {
        if (!val || val === "") {
            const newData = omit(user, [param]);
            setUser(newData);
        } else setUser({ ...user, [param]: val });
    };
    const setFirstName = (e) => updateUser("firstName", e);
    const setLastName = (e) => updateUser("lastName", e);
    const setEmail = (e) => updateUser("email", e);
    const setPhone = (e) => updateUser("phone", e);
    const setPassword = (e) => updateUser("password", e);
    const setImage = (e) => updateUser("image", e);
    const setConfirmPassword = (e) => updateUser("confirmPassword", e);

    const [canSubmit, setCanSubmit] = useState(false);

    const updateCanSubmit = () => {
        const requiredKeys = [
            "image",
            "firstName",
            "lastName",
            "email",
            "password",
            "confirmPassword",
            "phone",
        ];
        const currUserKeys = Object.keys(user);
        const nonMatchKeys = difference(requiredKeys, currUserKeys);
        const allFieldsPopulated = nonMatchKeys.length === 0;
        const passwordMatch = user.password === user.confirmPassword;
        setCanSubmit(allFieldsPopulated && passwordMatch);
    };

    useEffect(() => {
        updateCanSubmit();
    }, [user]);

    return (
        <VStack p={4} flex={1} justifyContent={"center"} space={4}>
            <HStack alignItems={"center"} space={2} mb={4}>
                <BackButton />
                <Heading>Sign Up</Heading>
            </HStack>
            <VStack space={4} w={"full"}>
                <AddProfileImage update={setImage} />
                <AuthInput label={"First Name"} onChangeText={setFirstName} />
                <AuthInput label={"Last Name"} onChangeText={setLastName} />
                <AuthInput label={"Phone"} onChangeText={setPhone} />
                <AuthInput label={"Email address"} onChangeText={setEmail} />
                <HStack w={"full"} space={2}>
                    <VStack flex={1}>
                        <AuthInput
                            label={"Password"}
                            onChangeText={setPassword}
                        />
                    </VStack>
                    <VStack flex={1}>
                        <AuthInput
                            label={"Confirm password"}
                            onChangeText={setConfirmPassword}
                        />
                    </VStack>
                </HStack>
                <Button
                    borderRadius={0}
                    colorScheme={"muted"}
                    bg={"black"}
                    size={"lg"}
                    _text={{ fontWeight: "bold" }}
                    isDisabled={!canSubmit}
                >
                    Continue
                </Button>
            </VStack>
        </VStack>
    );
};

const AddProfileImage = ({ update }) => {
    const [preview, setPreview] = useState(null);
    const clearPreview = () => {
        setPreview(null);
    };
    useEffect(() => {
        update(preview);
    }, [preview]);
    const selectImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.75,
        });
        if (!result.canceled) {
            const uriResult = result.assets[0].uri;
            setPreview(uriResult);
        }
    };
    return (
        <Pressable alignSelf={"center"} onPress={selectImage}>
            {preview && (
                <IconButton
                    onPress={clearPreview}
                    zIndex={999}
                    borderRadius={"full"}
                    bottom={0}
                    alignSelf={"flex-end"}
                    position={"absolute"}
                    variant={"solid"}
                    colorScheme={"muted"}
                    icon={<Icon as={Ionicons} name={"close"} />}
                />
            )}
            <Avatar
                boxSize={"130px"}
                bg={"muted.200"}
                borderColor={"muted.500"}
                borderWidth={4}
                source={{ uri: preview }}
            >
                <Icon
                    as={Ionicons}
                    name={"person-add"}
                    size={"xl"}
                    color={"muted.500"}
                />
            </Avatar>
        </Pressable>
    );
};

export default SignUp;
