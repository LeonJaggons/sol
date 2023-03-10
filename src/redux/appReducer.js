const appState = {
    appTitle: "Sol",
    user: {},
    currSeller: {},
};

const appReducer = (state = appState, action) => {
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
export default appReducer;
