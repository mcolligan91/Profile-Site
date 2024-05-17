import { combineReducers } from 'redux';

import IsMobileReducer from './IsMobileReducer';
import IsInvertedReducer from './IsInvertedReducer';
import VisibleContentReducer from './VisibleContentReducer';

const RootReducer = combineReducers({
    IsMobileReducer,
    IsInvertedReducer,
    VisibleContentReducer
});

export default RootReducer;