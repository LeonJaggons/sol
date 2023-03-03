const messagesState = {
    allMessages: {},
    latestMessages: {},
};
const messagesReducer = (state = messagesState, action) => {
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

export default messagesReducer;
