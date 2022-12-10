import React, {useState} from 'react';
import './App.css';
import '../assets/css/global.css'
import {HashRouter} from "react-router-dom";
import {Layout} from "../layout/Layout";
import {Pages} from "../layout/Pages";
import {HeaderTitleContext} from '../context/context';
import {Provider} from "react-redux";
import {store} from "../state/Store";

function App() {
    const [title, setTitle] = useState('')
    return (
        <div className="App">
            <HashRouter>
                <HeaderTitleContext.Provider
                    value={{title, setTitle}}
                >
                    <Provider store={store}>
                        <Layout>
                            <Pages/>
                        </Layout>
                    </Provider>
                </HeaderTitleContext.Provider>
            </HashRouter>
        </div>
    );
}

export default App;
