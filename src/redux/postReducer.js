const postState = {
    postImgs: [],
    postStep: "Post Images",
    postCategory: null,
    postDetails: {},
};
const postReducer = (state = postState, action) => {
    switch (action.type) {
        case "SET":
            return {
                ...state,
                [action.attr]: action.payload,
            };
        default:
            return {
                ...state,
            };
    }
};

export default postReducer;
