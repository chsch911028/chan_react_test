import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { requestRooms, filterRooms, bookmarkRooms, viewRooms,
				 bookMarkAlerts, scroll } from './reducers';
import { BrowserRouter, Route } from 'react-router-dom';

import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

const rootReducers = combineReducers({
	requestRooms, filterRooms, bookmarkRooms, viewRooms, bookMarkAlerts, scroll })

const store = createStore(rootReducers, applyMiddleware(thunkMiddleware));

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<Route path="/" component={App} />
		</BrowserRouter>
	</Provider>,
	 document.getElementById('root')
);
registerServiceWorker();
