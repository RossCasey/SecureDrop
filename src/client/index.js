import React from 'react';
import { render} from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import { createStore } from 'redux';
import rootReducer from './reducers';
import { runFunks } from 'redux-funk';

const store = createStore(
    rootReducer
);

runFunks(store);

render(
    <Provider store={store}>
       <App/>
    </Provider>,
    document.getElementById('container')
);