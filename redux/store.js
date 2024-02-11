// import { createStore } from 'redux';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// import { setAuthenticated } from './actions';

// const persistConfig = {
//     key: 'root',

//     storage,
// };

// const initialState = {
//     isAuthenticated: false,
// };

// const reducer = (state = initialState, action) => {
//     switch (action.type) {
//         case 'SET_AUTHENTICATED':
//             return { ...state, isAuthenticated: action.payload };

//         case 'SET_UNAUTHENTICATED':
//             return { ...state, isAuthenticated: false };

//         default:
//             return state;
//     }
// };

// const persistedReducer = persistReducer(persistConfig, reducer);
// const store = createStore(persistedReducer);
// const persistor = persistStore(store);
// export { store, persistor };
