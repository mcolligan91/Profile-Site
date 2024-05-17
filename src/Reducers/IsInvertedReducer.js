const initState = { isInverted: false };

const IsInvertedReducer = (state = initState, action) => {
    if (action.type === 'UPDATE_ISINVERTED') {
        const {isInverted} = state;
        return { isInverted: !isInverted }
    }
    return state;
} 

export default IsInvertedReducer;