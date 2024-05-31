const initState = { isMobile: false };

const IsMobileReducer = (state = initState, action) => {
    if (action.type === 'UPDATE_ISMOBILE') {
		const {isMobile} = state;
		let currentIsMobileState = (window.innerWidth <= 767);
		if (currentIsMobileState !== isMobile) {
            return { isMobile: currentIsMobileState };
		}
    }
    return state;
} 

export default IsMobileReducer;