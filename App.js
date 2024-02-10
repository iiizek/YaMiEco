import React, { Suspense } from 'react';
import { View } from'react-native';
import Navigation from './Navigation';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';

export default function App() {
    return (
        // <Provider store={store}>
        //     <PersistGate loading={null} persistor={persistor}>
        //         <Suspense fallback={<View />}>
        //             <Navigation />
        //         </Suspense>
        //     </PersistGate>
        // </Provider>
        <Navigation />
    );
}
