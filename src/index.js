import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { requestRooms, filterRooms, bookmarkRooms, viewRooms,
				 bookMarkAlerts } from './reducers';

import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

const rootReducers = combineReducers({
	requestRooms, filterRooms, bookmarkRooms, viewRooms, bookMarkAlerts })

const store = createStore(rootReducers, applyMiddleware(thunkMiddleware));

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	 document.getElementById('root')
);
registerServiceWorker();
