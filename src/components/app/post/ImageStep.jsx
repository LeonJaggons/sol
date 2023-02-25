import "react-native-get-random-values";
import React, { useEffect, useState } from "react";
import PostStep from "./PostStep";
import {
    Text,
    Button,
    Icon,
    Image,
    Pressable,
    Progress,
    VStack,
    Menu,
} from "native-base";
import { Ionicons } from "react-native-vector-icons";
import { v4 } from "uuid";

import * as ImagePicker from "expo-image-picker";
import { ImageDisplay } from "../../util/ImageDisplay";
import { useDispatch, useSelector } from "react-redux";

const TitleImgStep = () => {
    const [imgCount, setImgCount] = useState(0);
    const [canContinue, setCanContinue] = useState(false);
    useEffect(() => {
        setCanContinue(imgCount >= 1);
    }, [imgCount]);
    return (
        <PostStep title={"Post Images"} canContinue={canContinue} step={1}>
            <ImageAdder updateCount={setImgCount} />
        </PostStep>
    );
};

const ImageAdder = ({ updateCount }) => {
    const dispatch = useDispatch();
    const postDetails = useSelector((state) => state.post.postDetails);
    const [imgs, setImgs] = useState([]);
    const [hasImgs, setHasImgs] = useState(false);

    const addImage = (uri) => {
        setImgs([...imgs, { uri: uri, id: v4() }]);
    };

    const uploadImages = () => {
        dispatch({
            type: "SET",
            attr: "postDetails",
            payload: { ...postDetails, imgs: [...imgs] },
        });
    };

    useEffect(() => {
        updateCount(imgs.length);
        uploadImages();
    }, [imgs]);

    return (
        <VStack space={4}>
            <ImageDisplay imgs={imgs} add={addImage} />
            <VStack space={2}>
                <LibImageButton add={addImage} />
                <CamImageButton add={addImage} />
            </VStack>
            <ImageProgress imgCount={imgs.length} />
        </VStack>
    );
};

const ImageProgress = ({ imgCount }) => {
    return (
        <VStack alignItems={"center"} w={"full"} space={1}>
            <Progress
                _filledTrack={{
                    bg: imgCount < 6 ? "black" : "red.500",
                }}
                value={imgCount}
                max={6}
                w={"full"}
            />
            <Text
                fontWeight={"bold"}
                color={imgCount < 6 ? "muted.400" : "red.500"}
                fontSize={12}
            >
                {imgCount}/6
            </Text>
        </VStack>
    );
};

const LibImageButton = ({ add }) => {
    const selectImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.55,
        });
        if (!result.canceled) {
            const uriResult = result.assets[0].uri;
            add(uriResult);
        }
    };
    return (
        <Button
            onPress={selectImage}
            borderRadius={0}
            bg={"transparent"}
            borderColor={"black"}
            borderWidth={1}
            _text={{ fontWeight: "medium", color: "black" }}
            _pressed={{ bg: "muted.200" }}
            leftIcon={<Icon as={Ionicons} name={"image"} color={"black"} />}
        >
            Select photo from library
        </Button>
    );
};

const CamImageButton = ({ add }) => {
    return (
        <Button
            borderRadius={0}
            bg={"transparent"}
            borderColor={"black"}
            borderWidth={1}
            _text={{ fontWeight: "medium", color: "black" }}
            leftIcon={<Icon as={Ionicons} name={"camera"} color={"black"} />}
        >
            Take a new photo
        </Button>
    );
};

export default TitleImgStep;
