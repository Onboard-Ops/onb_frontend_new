import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/stores';
import 'react-toastify/dist/ReactToastify.css';
import 'antd/dist/antd.min.css';
import 'antd/dist/antd.less';

//to access from the browser
window.store = store;
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Provider store={store}>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</Provider>
);
