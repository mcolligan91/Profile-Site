const initState = { visibleContent: null };

const VisibleContentReducer = (state = initState, action) => {
    if (action.type === 'UPDATE_VISIBLECONTENT') {
		return {visibleContent: action.content};
    }
    return state;
} 

export default VisibleContentReducer;