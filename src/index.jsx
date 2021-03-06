import React from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';

//import { configureStore } from '@reduxjs/toolkit'
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import moviesApp from './reducers/reducers';
import { devToolsEnhancer } from 'redux-devtools-extension';

import MainView from './components/main-view/main-view';

//Import state to indicate that you need to bundle `./index.scss`
import './index.scss';


const store = createStore(moviesApp, devToolsEnhancer());

//Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <div className='main-view'>
                    <Container>
                        <MainView />
                    </Container>
                </div>
            </Provider>
        );
    }
}

//Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

//Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);