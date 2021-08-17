import React from 'react';
import './App.css';
import Layout from './components/Layout';
import Appbar from './components/Appbar';
import { GlobalProvider } from './context/GlobalState';

function App() {
    return (
        <>
            <Appbar />
            <GlobalProvider>
                <Layout/>
            </GlobalProvider>
        </>
    )
}

export default App
